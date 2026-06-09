import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactTyped } from 'react-typed'
import { Link as ScrollLink } from 'react-scroll'
import { saveAs } from 'file-saver'
import me from '../Assets/Mee.jpg'
import translation, { useTranslation } from '../Contexts/language'
import ThreeBackground from './ThreeBackground'
import '../index.css'

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const Intro = () => {
    const { lang } = useTranslation()
    const [showBgText, setShowBgText] = useState(false)
    const handleDownload = () => saveAs(`${process.env.PUBLIC_URL}/CV.pdf`, 'Ayush-CV.pdf')

    useEffect(() => {
        const timer = setTimeout(() => setShowBgText(true), 5500)
        return () => clearTimeout(timer)
    }, [])

    const socials = [
        { href: 'https://github.com/ayushk3609', icon: 'fi-brands-github', label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/ayush-kaushik-62008315a/', icon: 'fi-brands-linkedin', label: 'LinkedIn' },
        { href: 'https://www.instagram.com/ayush.coshik/', icon: 'fi-brands-instagram', label: 'Instagram' },
        { href: 'https://discord.com/channels/755433373463216278/755433373463216281', icon: 'fi-brands-discord', label: 'Discord' },
    ]

    return (
        <section className='relative min-h-screen flex items-center overflow-hidden'>
            {/* Background gradient */}
            <div className='absolute inset-0 hero-bg'></div>

            {/* Three.js animated particle network */}
            <ThreeBackground />

            {/* Glow Orbs */}
            <div className='orb w-[500px] h-[500px] top-[-100px] left-[-100px]' style={{ background: 'rgba(124,58,237,0.12)' }}></div>
            <div className='orb w-[400px] h-[400px] bottom-[-50px] right-[-50px]' style={{ background: 'rgba(6,182,212,0.08)' }}></div>

            {/* ── Neon background text spanning the full hero ── */}
            <AnimatePresence>
                {showBgText && (
                    <motion.div
                        key='neon-bg'
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        className='absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none'
                        style={{ zIndex: 1 }}
                    >
                        <h2 className='neon-bg-text'>Full Stack<br />Developer</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className='relative w-full max-w-6xl mx-auto px-6 pt-28 pb-32' style={{ zIndex: 2 }}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center'>

                    {/* ── Left: Text Content ── */}
                    <motion.div
                        variants={stagger}
                        initial='hidden'
                        animate='visible'
                        className='space-y-6 order-2 md:order-1'
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp}>
                            <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium'
                                style={{
                                    border: '1px solid rgba(124,58,237,0.3)',
                                    background: 'rgba(124,58,237,0.1)',
                                    color: '#a78bfa'
                                }}>
                                <span className='w-2 h-2 rounded-full bg-violet-400 animate-pulse'></span>
                                Available for work
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.div variants={fadeUp}>
                            <p className='font-display font-medium mb-1' style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                Hi, I'm
                            </p>
                            <h1 className='font-display font-bold leading-none' style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
                                <span className='gradient-text'>Ayush</span>
                                <br />
                                <span style={{ color: 'var(--text)' }}>Kaushik</span>
                            </h1>
                        </motion.div>

                        {/* Typed subtitle */}
                        <motion.div variants={fadeUp} className='text-lg font-medium min-h-[1.75rem]' style={{ color: 'var(--text-muted)' }}>
                            <ReactTyped
                                strings={translation[lang].intro}
                                typeSpeed={50}
                                backSpeed={35}
                                backDelay={1500}
                                loop={false}
                                showCursor={true}
                                cursorChar='|'
                                onComplete={() => {
                                    const cursor = document.querySelector('.typed-cursor')
                                    if (cursor) cursor.style.display = 'none'
                                }}
                            />
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeUp} className='flex flex-wrap gap-3 pt-1'>
                            <ScrollLink to='projects' smooth duration={500}>
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className='btn-primary px-6 py-3 rounded-xl text-white font-semibold text-sm'
                                >
                                    View Projects
                                </motion.button>
                            </ScrollLink>
                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownload}
                                className='btn-ghost px-6 py-3 rounded-xl text-sm font-semibold'
                                style={{ color: 'var(--text)' }}
                            >
                                Download CV
                            </motion.button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeUp} className='flex items-center gap-3 pt-1'>
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
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Image ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className='flex justify-center order-1 md:order-2'
                    >
                        <div className='relative'>
                            {/* Static gradient glow border (no spin) */}
                            <div className='avatar-wrapper' style={{ width: 'clamp(260px, 35vw, 320px)', height: 'clamp(260px, 35vw, 320px)' }}>
                                <div className='avatar-inner w-full h-full'>
                                    <img
                                        src={me}
                                        alt='Ayush Kaushik'
                                        className='w-full h-full object-cover object-center'
                                    />
                                </div>
                            </div>

                            {/* Floating Badge 1 */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className='absolute -top-5 -right-2 md:-right-8 floating-badge'
                            >
                                ⚛ React Dev
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
                                className='absolute -bottom-5 -left-2 md:-left-8 floating-badge'
                            >
                                🚀 Full Stack
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className='absolute bottom-6 left-1/2 -translate-x-1/2'
                style={{ zIndex: 3 }}
            >
                <ScrollLink to='about' smooth duration={500} className='cursor-pointer block'>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className='w-6 h-10 rounded-full flex items-start justify-center p-1.5'
                        style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}
                    >
                        <div className='w-1 h-2 rounded-full' style={{ background: '#7c3aed' }}></div>
                    </motion.div>
                </ScrollLink>
            </motion.div>
        </section>
    )
}

export default Intro
