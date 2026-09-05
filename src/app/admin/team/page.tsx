'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { Users, Edit2, Terminal, Palette } from 'lucide-react'

type TeamMember = Database['public']['Tables']['team_members']['Row']

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    loadTeam()
  }, [])

  const loadTeam = async () => {
    const list = await DataService.getTeam()
    setTeam([...list])
  }

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="border-b border-studio-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
          // REPOSITORY MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
          STUDIO FOUNDERS & TEAM
        </h1>
        <p className="text-xs font-mono text-studio-muted mt-1">
          Configure founder profiles displayed on the public /about page.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((member) => (
          <div key={member.id} className="border border-studio-border bg-studio-surface p-8 space-y-6">
            <div className="flex items-center space-x-4 border-b border-studio-border pb-6">
              <div className="w-12 h-12 bg-studio-bg border border-studio-border flex items-center justify-center text-studio-accent font-mono font-bold text-sm">
                0{member.display_order}
              </div>
              <div>
                <h2 className="text-lg font-bold text-studio-fg">{member.name}</h2>
                <span className="font-mono text-xs text-studio-accent">{member.role}</span>
              </div>
            </div>

            <p className="text-xs text-studio-muted leading-relaxed font-normal">
              {member.bio}
            </p>

            <div className="pt-4 border-t border-studio-border flex justify-between items-center font-mono text-xs text-studio-muted">
              <span>SAN3A CORE MEMBER</span>
              <span className="text-emerald-500 font-bold">CONFIGURED</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
