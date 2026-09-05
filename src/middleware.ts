import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSupabaseUrl, getSupabasePublishableKey } from './lib/supabase/env'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const url = getSupabaseUrl()
    const key = getSupabasePublishableKey()

    if (!url || !key) {
      const fallbackCookie = request.cookies.get('san3a_admin_session')
      if (!fallbackCookie || fallbackCookie.value !== 'authenticated') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return NextResponse.next()
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const fallbackCookie = request.cookies.get('san3a_admin_session')
      if (!fallbackCookie || fallbackCookie.value !== 'authenticated') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return response
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      const fallbackCookie = request.cookies.get('san3a_admin_session')
      if (!fallbackCookie || fallbackCookie.value !== 'authenticated') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
