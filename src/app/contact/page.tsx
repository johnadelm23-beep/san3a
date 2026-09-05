'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DataService } from '@/lib/services/dataService'
import { ArrowRight, CheckCircle2, Mail, MessageSquare, Send, PhoneCall } from 'lucide-react'

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
              // START A PROJECT
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              INITIATE INQUIRY.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              Tell us about your project requirements. SAN3A responds directly within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Project Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7 border border-studio-border bg-studio-surface p-8 sm:p-12 space-y-8">
              
              {submitted ? (
                <div className="py-12 space-y-6 text-center">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg">
                    INQUIRY RECEIVED.
                  </h2>
                  <p className="text-sm text-studio-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="text-studio-fg font-semibold">{formData.name}</span>. The SAN3A founders have received your inquiry and will respond to <span className="text-studio-fg font-semibold">{formData.email}</span> shortly.
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
                    className="inline-block mt-4 border border-studio-border px-6 py-3 text-xs uppercase tracking-widest font-mono text-studio-muted hover:text-studio-fg"
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
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
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

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
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
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-studio-bg border border-studio-border px-4 py-3.5 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
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

                  {/* Budget Selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
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
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
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
                    className="w-full bg-studio-fg text-studio-bg py-4 text-xs uppercase tracking-widest font-extrabold flex items-center justify-center space-x-3 border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Sending Inquiry...' : 'Send Project Inquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>

            {/* Right: Direct Communication Channels (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="border border-studio-border bg-studio-bg p-8 space-y-6">
                <span className="font-mono text-xs text-studio-accent uppercase tracking-widest block">
                  // DIRECT CHANNELS
                </span>
                
                <h3 className="text-2xl font-bold tracking-tight text-studio-fg">
                  NEED A QUICK RESPONSE?
                </h3>
                
                <p className="text-sm text-studio-muted leading-relaxed">
                  For urgent inquiries or instant scoping questions, connect directly with the SAN3A founders via WhatsApp or email.
                </p>

                <div className="space-y-4 pt-4 border-t border-studio-border font-mono text-xs">
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-studio-border bg-studio-surface hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 text-studio-fg font-semibold">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp Direct Chat</span>
                    </div>
                    <span className="text-studio-muted group-hover:text-emerald-500">↗</span>
                  </a>

                  <a
                    href="mailto:hello@san3a.co"
                    className="flex items-center justify-between p-4 border border-studio-border bg-studio-surface hover:border-studio-fg transition-colors group"
                  >
                    <div className="flex items-center gap-3 text-studio-fg font-semibold">
                      <Mail className="w-4 h-4 text-studio-accent" />
                      <span>hello@san3a.co</span>
                    </div>
                    <span className="text-studio-muted group-hover:text-studio-fg">↗</span>
                  </a>
                </div>
              </div>

              {/* Studio Specs */}
              <div className="border border-studio-border bg-studio-surface p-6 font-mono text-xs text-studio-muted space-y-3">
                <div className="flex justify-between">
                  <span>TIMEZONE:</span>
                  <span className="text-studio-fg">GMT+2 / GMT+3</span>
                </div>
                <div className="flex justify-between">
                  <span>RESPONSE TIME:</span>
                  <span className="text-studio-fg">&lt; 24 HOURS</span>
                </div>
                <div className="flex justify-between">
                  <span>CAPACITY:</span>
                  <span className="text-emerald-500 font-semibold">ACCEPTING Q2/Q3</span>
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
