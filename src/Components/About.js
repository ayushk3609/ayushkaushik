import React from 'react'
import { motion } from 'framer-motion'
import AboutPc from '../Assets/AboutPc.jpeg'
import { Link } from 'react-scroll'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
}

const About = () => {
    const { lang } = useTranslation()

    const stats = [
        { value: '4+', label: 'Years Exp.' },
        { value: '2', label: 'Companies' },
        { value: '20+', label: 'Technologies' },
    ]

    return (
        <section className='py-24 relative overflow-hidden'>
            {/* Subtle glow */}
            <div className='orb w-[600px] h-[400px] top-1/2 -left-64 -translate-y-1/2' style={{ background: 'rgba(124,58,237,0.06)' }}></div>

            <div className='max-w-6xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center'>

                    {/* ── Image ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className='flex justify-center md:justify-start'
                    >
                        <div className='relative'>
                            {/* Image */}
                            <div className='w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden relative z-10'>
                                <img src={AboutPc} alt='About Ayush' className='w-full h-full object-cover' />
                                {/* Subtle gradient overlay */}
                                <div className='absolute inset-0' style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(124,58,237,0.15))' }}></div>
                            </div>

                            {/* Decorative offset border */}
                            <div className='absolute -top-3 -left-3 w-full h-full rounded-2xl z-0'
                                style={{ border: '1px solid rgba(124,58,237,0.25)' }}>
                            </div>

                            {/* Accent dot */}
                            <div className='absolute -bottom-3 -right-3 w-20 h-20 rounded-xl z-0'
                                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Content ── */}
                    <motion.div
                        variants={stagger}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='space-y-6'
                    >
                        <motion.div variants={fadeUp}>
                            <span className='section-label'>About Me</span>
                            <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                                {translation[lang].about}
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeUp} className='text-base leading-relaxed' style={{ color: 'var(--text-muted)' }}>
                            {translation[lang].aboutdesc}
                        </motion.p>

                        {/* Stats */}
                        <motion.div variants={fadeUp} className='grid grid-cols-3 gap-3'>
                            {stats.map(stat => (
                                <div key={stat.label} className='glass-card rounded-xl p-4 text-center'>
                                    <div className='font-display font-bold text-2xl gradient-text'>{stat.value}</div>
                                    <div className='text-xs mt-1 font-medium' style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <Link to='skills' smooth duration={500}>
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className='btn-primary px-6 py-3 rounded-xl text-white font-semibold text-sm'
                                >
                                    {translation[lang].aboutbtn} →
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
