'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Project } from '@/lib/types/admin.types'
import { ProjectEditor } from '@/components/admin/editors/ProjectEditor'
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton'

export default function EditProjectPage() {
  const params = useParams()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      const list = await DataService.getProjects()
      const found = list.find((p) => p.id === id)
      if (found) setProject(found as any)
      setLoading(false)
    }
    fetchProject()
  }, [id])

  if (loading) return <LoadingSkeleton rows={6} />
  if (!project) return <div className="font-mono text-xs text-studio-muted">Project not found.</div>

  return <ProjectEditor initialData={project} isEdit={true} />
}
