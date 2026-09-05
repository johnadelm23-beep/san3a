'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DataService } from '@/lib/services/dataService'
import { Phone, MessageSquare, ArrowUpRight, CheckCircle2, Send } from 'lucide-react'
import { FacebookIcon } from '@/components/icons/FacebookIcon'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: '$5,000 - $10,000',
    description: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.description) {
      setErrorMessage('Please fill out all required fields (Name, Email, Description).')
      return
    }

    setSubmitting(true)
    setErrorMessage('')

    try {
      await DataService.submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service,
        budget: formData.budget,
        description: formData.description,
      })

      setSubmitting(false)
      setSubmitted(true)
    } catch {
      setSubmitting(false)
      setErrorMessage('An error occurred submitting your inquiry. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A INQUIRY
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              LET&apos;S BUILD SOMETHING TOGETHER.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              Fill out the project inquiry form below or reach out directly to John & George.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Project Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7 border border-studio-border bg-studio-surface p-8 sm:p-12 space-y-8">
              
              {submitted ? (
                <div className="py-12 space-y-6 text-center font-mono">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
                    INQUIRY RECEIVED.
                  </h2>
                  <p className="text-sm text-studio-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="text-studio-fg font-semibold">{formData.name}</span>. John & George have received your inquiry and will respond to <span className="text-studio-fg font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Web Development',
                        budget: '$5,000 - $10,000',
                        description: '',
                      })
                    }}
                    className="inline-block mt-4 border border-studio-border px-6 py-3 text-xs uppercase tracking-widest text-studio-muted hover:text-studio-fg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMessage && (
                    <div className="p-4 border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 font-mono">
                      <label className="text-xs text-studio-muted uppercase tracking-wider block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                      />
                    </div>

                    <div className="space-y-2 font-mono">
                      <label className="text-xs text-studio-muted uppercase tracking-wider block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 font-mono">
                      <label className="text-xs text-studio-muted uppercase tracking-wider block">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+20 100 000 0000"
                        className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                      />
                    </div>

                    <div className="space-y-2 font-mono">
                      <label className="text-xs text-studio-muted uppercase tracking-wider block">
                        Primary Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="UI / UX Design">UI / UX Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Video Editing / Montage">Video Editing / Montage</option>
                        <option value="PowerPoint & Presentation Design">PowerPoint & Presentation Design</option>
                        <option value="Branding">Branding</option>
                        <option value="Custom Software Solutions">Custom Software Solutions</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2 font-mono">
                    <label className="text-xs text-studio-muted uppercase tracking-wider block">
                      Estimated Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                    >
                      <option value="< $3,000">&lt; $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 font-mono">
                    <label className="text-xs text-studio-muted uppercase tracking-wider block">
                      Project Description *
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Outline your project goals, scope, and timeline requirements..."
                      className="w-full bg-studio-bg border border-studio-border p-4 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-studio-fg text-studio-bg py-4 text-xs font-mono uppercase tracking-widest font-extrabold flex items-center justify-center space-x-3 border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Sending Inquiry...' : 'Send Project Inquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>

            {/* Right: Direct Founder Contact Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 font-mono text-xs">
              
              <div className="border border-studio-border bg-studio-bg p-8 space-y-6">
                <span className="text-studio-accent uppercase tracking-widest block font-semibold">
                  // DIRECT CHANNELS
                </span>
                
                <h2 className="text-2xl font-bold tracking-tight text-studio-fg font-sans">
                  TALK DIRECTLY TO THE FOUNDERS
                </h2>
                
                <p className="text-sm text-studio-muted leading-relaxed font-normal font-sans">
                  Skip the contact form and reach John or George directly for immediate scoping questions and project consultation.
                </p>

                <div className="space-y-4 pt-4 border-t border-studio-border">
                  
                  {/* John Card */}
                  <div className="border border-studio-border bg-studio-surface p-5 space-y-3">
                    <div className="text-studio-fg font-bold text-sm font-sans flex justify-between items-center">
                      <span>JOHN</span>
                      <span className="text-[10px] text-studio-accent border border-studio-accent/40 px-2 py-0.5">FOUNDER</span>
                    </div>

                    <div className="flex flex-col space-y-2 pt-1 text-xs">
                      <a href="tel:01226806622" className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-studio-fg transition-colors group">
                        <span className="flex items-center gap-2 text-studio-fg font-semibold">
                          <Phone className="w-3.5 h-3.5 text-studio-accent" />
                          <span>01226806622</span>
                        </span>
                        <span className="text-[10px] text-studio-muted group-hover:text-studio-fg">Call →</span>
                      </a>

                      <a href="https://wa.me/201226806622" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-emerald-500/60 transition-colors group">
                        <span className="flex items-center gap-2 text-studio-fg font-semibold">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                          <span>WhatsApp John</span>
                        </span>
                        <span className="text-[10px] text-studio-muted group-hover:text-emerald-400">Chat ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* George Card */}
                  <div className="border border-studio-border bg-studio-surface p-5 space-y-3">
                    <div className="text-studio-fg font-bold text-sm font-sans flex justify-between items-center">
                      <span>GEORGE</span>
                      <span className="text-[10px] text-studio-accent border border-studio-accent/40 px-2 py-0.5">FOUNDER</span>
                    </div>

                    <div className="flex flex-col space-y-2 pt-1 text-xs">
                      <a href="tel:+201229518750" className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-studio-fg transition-colors group">
                        <span className="flex items-center gap-2 text-studio-fg font-semibold">
                          <Phone className="w-3.5 h-3.5 text-studio-accent" />
                          <span>+20 12 29518750</span>
                        </span>
                        <span className="text-[10px] text-studio-muted group-hover:text-studio-fg">Call →</span>
                      </a>

                      <a href="https://wa.me/201229518750" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-emerald-500/60 transition-colors group">
                        <span className="flex items-center gap-2 text-studio-fg font-semibold">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                          <span>WhatsApp George</span>
                        </span>
                        <span className="text-[10px] text-studio-muted group-hover:text-emerald-400">Chat ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Facebook Card */}
                  <div className="pt-2">
                    <a
                      href="https://www.facebook.com/share/p/191qx2khJL/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border border-studio-border bg-studio-surface hover:border-blue-500/60 transition-colors group"
                    >
                      <div className="flex items-center gap-3 text-studio-fg font-semibold">
                        <FacebookIcon className="w-4 h-4 text-blue-500" />
                        <span>SAN3A Official Facebook</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-studio-muted group-hover:text-studio-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
