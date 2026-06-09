import React, { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { saveAs } from 'file-saver'
import { useTheme } from '../Contexts/theme'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import translation, { SUPPORTED_LANG, useTranslation } from '../Contexts/language'
import { motion, AnimatePresence } from 'framer-motion'
import '../index.css'

const Header = () => {
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()
    const { lang, setLang } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleDownload = () => saveAs(`${process.env.PUBLIC_URL}/CV.pdf`, 'Ayush-CV.pdf')

    const navLinks = [
        { label: translation[lang].Home, to: 'home' },
        { label: translation[lang].Project, to: 'projects' },
        { label: translation[lang].Experience, to: 'experience' },
        { label: translation[lang].Blog, to: 'blogs' },
        { label: translation[lang].Contact, to: 'contact' },
    ]

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4'
        >
            <div className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-400 ${
                scrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'
            }`}>
                {/* Logo */}
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    className='font-display text-xl font-bold gradient-text cursor-pointer select-none'
                >
                    AK
                </motion.span>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex items-center gap-1'>
                    {location.pathname === '/' ? (
                        navLinks.map(link => (
                            <ScrollLink
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                activeClass='nav-active'
                                className='cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                            >
                                {link.label}
                            </ScrollLink>
                        ))
                    ) : (
                        <RouterLink
                            to='/'
                            className='px-4 py-2 rounded-lg text-sm font-medium transition-colors'
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Home
                        </RouterLink>
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className='hidden md:flex items-center gap-3'>
                    {location.pathname === '/' && (
                        <select
                            onChange={e => setLang(e.target.value)}
                            className='bg-transparent text-sm focus:outline-none cursor-pointer px-2 py-1 rounded-lg'
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {SUPPORTED_LANG.map(l => (
                                <option key={l.identifier} value={l.identifier} style={{ background: '#0d0d1a', color: 'white' }}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button
                        onClick={toggleTheme}
                        className='p-2 rounded-lg transition-colors'
                        style={{ color: 'var(--text-muted)' }}
                        aria-label='Toggle theme'
                    >
                        {theme === 'dark'
                            ? <i className='fi fi-ss-brightness' style={{ fontSize: '1.1rem' }}></i>
                            : <i className='fi fi-rs-moon-stars' style={{ fontSize: '1.1rem' }}></i>
                        }
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className='flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm font-semibold text-white'
                    >
                        CV <i className='fi fi-ss-download' style={{ fontSize: '0.75rem' }}></i>
                    </motion.button>
                </div>

                {/* Mobile Controls */}
                <div className='md:hidden flex items-center gap-2'>
                    <button onClick={toggleTheme} className='p-2' style={{ color: 'var(--text-muted)' }} aria-label='Toggle theme'>
                        {theme === 'dark'
                            ? <i className='fi fi-ss-brightness'></i>
                            : <i className='fi fi-rs-moon-stars'></i>
                        }
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='p-2'
                        style={{ color: 'var(--text-muted)' }}
                        aria-label='Toggle menu'
                    >
                        {isMobileMenuOpen
                            ? <i className='fi fi-ss-cross'></i>
                            : <i className='fi fi-ss-menu-burger'></i>
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className='absolute top-full mt-2 left-4 right-4 glass-nav rounded-2xl p-3 md:hidden shadow-2xl'
                    >
                        {location.pathname === '/' && navLinks.map(link => (
                            <ScrollLink
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='block px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors'
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                            >
                                {link.label}
                            </ScrollLink>
                        ))}
                        <div className='mt-2 pt-2 flex flex-col gap-2' style={{ borderTop: '1px solid var(--border)' }}>
                            <select
                                onChange={e => setLang(e.target.value)}
                                className='bg-transparent text-sm focus:outline-none px-4 py-2 rounded-xl'
                                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                            >
                                {SUPPORTED_LANG.map(l => (
                                    <option key={l.identifier} value={l.identifier} style={{ background: '#0d0d1a', color: 'white' }}>
                                        {l.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleDownload}
                                className='btn-primary px-4 py-2 rounded-xl text-sm text-white font-semibold flex items-center justify-center gap-2'
                            >
                                Download CV <i className='fi fi-ss-download' style={{ fontSize: '0.75rem' }}></i>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Header
