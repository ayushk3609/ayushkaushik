import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const Footer = () => {
    const { lang } = useTranslation()

    const socials = [
        { href: 'https://www.instagram.com/ayush.coshik/', icon: 'fi-brands-instagram', label: 'Instagram' },
        { href: 'https://github.com/ayushk3609', icon: 'fi-brands-github', label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/ayush-kaushik-62008315a/', icon: 'fi-brands-linkedin', label: 'LinkedIn' },
        { href: 'mailto:ayushcoshik@gmail.com', icon: 'fi-ss-at', label: 'Email' },
    ]

    const navLinks = [
        { label: translation[lang].Home, to: 'home' },
        { label: translation[lang].Project, to: 'projects' },
        { label: translation[lang].Blog, to: 'blogs' },
        { label: translation[lang].Contact, to: 'contact' },
    ]

    return (
        <footer className='pt-16 pb-8 relative' style={{ borderTop: '1px solid var(--border)' }}>
            <div className='max-w-6xl mx-auto px-6'>
                {/* Top row */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-8 mb-10'>
                    {/* Logo */}
                    <div>
                        <span className='font-display text-2xl font-bold gradient-text'>Ayush Kaushik</span>
                        <p className='text-xs mt-1' style={{ color: 'var(--text-muted)' }}>Frontend Developer · React Enthusiast</p>
                    </div>

                    {/* Nav */}
                    <nav>
                        <ul className='flex flex-wrap justify-center gap-1'>
                            {navLinks.map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        className='px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors block'
                                        style={{ color: 'var(--text-muted)' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Socials */}
                    <div className='flex items-center gap-3'>
                        {socials.map(s => (
                            <motion.a
                                key={s.href}
                                href={s.href}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={s.label}
                                whileHover={{ scale: 1.12, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className='social-icon'
                            >
                                <i className={`fi ${s.icon}`}></i>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-2'>
                        <p className='text-xs' style={{ color: 'var(--text-muted)' }}>
                            &copy; 2024 Ayush Kaushik. All rights reserved.
                        </p>
                        <p className='text-xs' style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                            Built with React &amp; Framer Motion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
