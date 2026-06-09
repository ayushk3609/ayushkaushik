import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', comment: '' })
    const [loading, setLoading] = useState(false)
    const { lang } = useTranslation()

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPELATE_ID,
                e.target,
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            toast.success('Message sent! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', comment: '' })
        } catch {
            toast.error('Failed to send. Please try again or email me directly.')
        } finally {
            setLoading(false)
        }
    }

    const contactInfo = [
        { icon: 'fi-brands-github', label: 'GitHub', value: 'ayushk3609', href: 'https://github.com/ayushk3609' },
        { icon: 'fi-brands-linkedin', label: 'LinkedIn', value: 'Ayush Kaushik', href: 'https://www.linkedin.com/in/ayush-kaushik-62008315a/' },
        { icon: 'fi-ss-at', label: 'Email', value: 'ayushcoshik@gmail.com', href: 'mailto:ayushcoshik@gmail.com' },
    ]

    return (
        <section className='py-24 relative overflow-hidden'>
            <ToastContainer position='top-center' transition={Bounce} theme='dark' />

            {/* Glow */}
            <div className='orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ background: 'rgba(124,58,237,0.07)' }}></div>

            <div className='max-w-5xl mx-auto px-6'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-14'
                >
                    <span className='section-label'>Get In Touch</span>
                    <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                        {translation[lang].contact}
                    </h2>
                    <p className='mt-3 text-sm max-w-md mx-auto' style={{ color: 'var(--text-muted)' }}>
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-5 gap-8 items-start'>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className='md:col-span-2 space-y-4'
                    >
                        <p className='text-sm font-medium mb-6' style={{ color: 'var(--text-muted)' }}>
                            I'm currently open to new opportunities. Whether it's a freelance project, full-time role, or collaboration — reach out!
                        </p>

                        {contactInfo.map(item => (
                            <a
                                key={item.label}
                                href={item.href}
                                target='_blank'
                                rel='noreferrer'
                                className='glass-card rounded-xl p-4 flex items-center gap-4 group transition-all duration-300 block'
                                style={{ textDecoration: 'none' }}
                            >
                                <div className='social-icon flex-shrink-0' style={{ background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.25)', color: '#a78bfa' }}>
                                    <i className={`fi ${item.icon}`}></i>
                                </div>
                                <div>
                                    <div className='text-xs font-medium mb-0.5' style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                                    <div className='text-sm font-semibold' style={{ color: 'var(--text)' }}>{item.value}</div>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='md:col-span-3'
                    >
                        <form onSubmit={handleSubmit} className='glass-card rounded-2xl p-6 md:p-8 space-y-5'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className='text-xs font-semibold uppercase tracking-wider' style={{ color: 'var(--text-muted)' }}>
                                        {translation[lang].namePlace}
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='John Doe'
                                        required
                                        className='form-input'
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-xs font-semibold uppercase tracking-wider' style={{ color: 'var(--text-muted)' }}>
                                        {translation[lang].emailPlace}
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='you@example.com'
                                        required
                                        className='form-input'
                                    />
                                </div>
                            </div>

                            <div className='space-y-1.5'>
                                <label className='text-xs font-semibold uppercase tracking-wider' style={{ color: 'var(--text-muted)' }}>
                                    {translation[lang].commentPlace}
                                </label>
                                <textarea
                                    name='comment'
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder='Tell me about your project or just say hi...'
                                    rows={5}
                                    required
                                    className='form-input resize-none'
                                />
                            </div>

                            <motion.button
                                type='submit'
                                disabled={loading}
                                whileHover={!loading ? { scale: 1.02 } : {}}
                                whileTap={!loading ? { scale: 0.98 } : {}}
                                className='btn-primary w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <>
                                        <svg className='w-4 h-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        {translation[lang].contactbtn}
                                        <i className='fi fi-br-paper-plane' style={{ fontSize: '0.85rem' }}></i>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
