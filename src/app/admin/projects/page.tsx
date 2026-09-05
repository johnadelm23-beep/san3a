'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { Plus, FolderKanban, Trash2, Edit3, X, Check, Globe } from 'lucide-react'

type Project = Database['public']['Tables']['projects']['Row']

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Web Development',
    year: '2026',
    technologies: '',
    cover_image: '',
    project_url: '',
    featured: false,
    published: true,
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const list = await DataService.getProjects()
    setProjects(list)
  }

  const handleOpenAddModal = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: 'Web Development',
      year: '2026',
      technologies: 'Next.js, TypeScript, Tailwind CSS',
      cover_image: '',
      project_url: '',
      featured: false,
      published: true,
    })
    setModalOpen(true)
  }

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      year: project.year,
      technologies: project.technologies.join(', '),
      cover_image: project.cover_image,
      project_url: project.project_url || '',
      featured: project.featured,
      published: project.published,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await DataService.deleteProject(id)
      await loadProjects()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const techArray = formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)

    await DataService.saveProject({
      id: editingProject?.id,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      category: formData.category,
      year: formData.year,
      technologies: techArray,
      cover_image: formData.cover_image || '/projects/hero-preview.jpg',
      project_url: formData.project_url || null,
      featured: formData.featured,
      published: formData.published,
    })

    setModalOpen(false)
    await loadProjects()
  }

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
            // REPOSITORY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            PROJECT MANAGER
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center space-x-2 bg-studio-fg text-studio-bg px-5 py-3 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table or Empty State */}
      {projects.length === 0 ? (
        <div className="border border-studio-border bg-studio-surface p-12 text-center space-y-4">
          <FolderKanban className="w-10 h-10 text-studio-muted mx-auto" />
          <h2 className="text-xl font-bold text-studio-fg">NO PROJECTS IN REPOSITORY</h2>
          <p className="text-xs text-studio-muted max-w-md mx-auto">
            The public website is currently in clean standby mode. Click &quot;Add New Project&quot; above to create and publish client case studies.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-block mt-4 border border-studio-border px-4 py-2 text-xs uppercase tracking-widest font-mono text-studio-fg hover:border-studio-fg"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="border border-studio-border bg-studio-surface overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider bg-studio-bg/60">
                <th className="p-4 font-medium">PROJECT TITLE</th>
                <th className="p-4 font-medium">CATEGORY</th>
                <th className="p-4 font-medium">YEAR</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-studio-bg/40 transition-colors">
                  <td className="p-4 text-studio-fg font-semibold">{proj.title}</td>
                  <td className="p-4 text-studio-muted">{proj.category}</td>
                  <td className="p-4 text-studio-muted">{proj.year}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                      proj.published ? 'border-emerald-500 text-emerald-400' : 'border-studio-muted text-studio-muted'
                    }`}>
                      {proj.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => handleOpenEditModal(proj)}
                      className="text-studio-muted hover:text-studio-fg transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-studio-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-studio-border bg-studio-surface max-w-2xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <h2 className="text-xl font-bold tracking-tight text-studio-fg uppercase">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-studio-muted hover:text-studio-fg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-studio-muted uppercase block">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-muted uppercase block">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Cover Image URL</label>
                  <input
                    type="text"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="/projects/hero-preview.jpg"
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Live Project URL</label>
                  <input
                    type="text"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://client-project.com"
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2 border-t border-studio-border">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-studio-accent"
                  />
                  <span>Featured Project</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="accent-studio-accent"
                  />
                  <span>Publish to Website</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 border border-studio-border text-studio-muted hover:text-studio-fg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-studio-fg text-studio-bg font-extrabold uppercase border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}
