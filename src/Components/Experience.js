import React from 'react'
import { motion } from 'framer-motion'
import { saveAs } from 'file-saver'
import '../index.css'

const experiences = [
    {
        company: 'KeyOne',
        location: 'Bad Homburg, Germany',
        role: 'Fullstack Developer Intern',
        period: 'March 2026 – Present',
        duration: '4+ months',
        current: true,
        accent: '#7c3aed',
        lightAccent: '#a78bfa',
        bgAccent: 'rgba(124,58,237,0.08)',
        bullets: [
            'Set up and maintain CI/CD pipelines in Azure DevOps with automated build, test, and deployment to Azure App Services.',
            'Build cross-platform features for Web, Android, and iOS in React, TypeScript, and React Native within a production Turborepo monorepo.',
            'Delivered 4+ features end-to-end: dynamic category filter, Spin-to-Win promotional system, user feedback flow, and slug-generation for 1,700+ affiliate pages.',
            'Improved mobile SEO score from 73 → 97; develop and maintain NestJS microservices and PHP plugins.',
            'Write unit tests with Jest and end-to-end tests with Cypress; enforce TypeScript strict mode and ESLint across the codebase.',
        ],
        tags: ['React', 'TypeScript', 'NestJS', 'Azure DevOps', 'React Native', 'Jest', 'Cypress', 'Turborepo'],
    },
    {
        company: 'Tata Consultancy Services',
        location: 'Kolkata, India',
        role: 'Frontend Developer',
        period: 'Jun 2021 – Aug 2024',
        duration: '3 yrs 2 mos',
        current: false,
        accent: '#06b6d4',
        lightAccent: '#67e8f9',
        bgAccent: 'rgba(6,182,212,0.08)',
        bullets: [
            'Led frontend development for MobiBattle, a real-time multiplayer gaming platform — designed scalable, component-driven architecture in React and TypeScript.',
            'Reduced initial page load times by 22% through Core Web Vitals analysis and systematic resource optimisation.',
            'Built and maintained 30+ documented, reusable React components; authored technical documentation that accelerated delivery across multiple product streams.',
            'Developed a scalable internal CMS handling thousands of concurrent users — full implementation from architecture to documentation.',
        ],
        tags: ['React', 'TypeScript', 'REST APIs', 'Performance', 'Component Library', 'CMS'],
    },
]

const stats = [
    { value: '4+', label: 'Years Experience' },
    { value: '2', label: 'Companies' },
    { value: '30+', label: 'Components Built' },
    { value: '22%', label: 'Perf Improvement' },
]

const ExperienceCard = ({ exp, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
        className='relative'
    >
        {/* Timeline dot */}
        <div className='absolute left-[-41px] top-8 hidden md:flex items-center justify-center'
            style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: exp.accent,
                boxShadow: `0 0 12px ${exp.accent}80, 0 0 24px ${exp.accent}40`,
                zIndex: 2,
            }}
        >
            {exp.current && (
                <span className='absolute w-6 h-6 rounded-full animate-ping'
                    style={{ background: `${exp.accent}30` }}></span>
            )}
        </div>

        {/* Card */}
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className='glass-card rounded-2xl p-6 md:p-8 cursor-default'
            style={{
                borderLeft: `3px solid ${exp.accent}`,
                background: `linear-gradient(135deg, ${exp.bgAccent}, var(--surface))`,
            }}
        >
            {/* Header row */}
            <div className='flex flex-wrap items-start justify-between gap-4 mb-5'>
                <div className='flex-1 min-w-0'>
                    {/* Role */}
                    <h3 className='font-display font-bold text-xl leading-tight mb-2' style={{ color: 'var(--text)' }}>
                        {exp.role}
                    </h3>
                    {/* Company · Location */}
                    <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                        <span className='font-bold text-sm' style={{ color: exp.accent }}>{exp.company}</span>
                        <span style={{ color: 'var(--border)' }}>·</span>
                        <span className='text-sm' style={{ color: 'var(--text-muted)' }}>{exp.location}</span>
                    </div>
                    {/* Period + duration */}
                    <div className='flex items-center gap-2 mt-1.5'>
                        <i className='fi fi-rs-calendar-clock text-xs' style={{ color: 'var(--text-muted)' }}></i>
                        <span className='text-sm' style={{ color: 'var(--text-muted)' }}>{exp.period}</span>
                        <span className='text-xs px-2 py-0.5 rounded-full font-medium'
                            style={{ background: `${exp.accent}20`, color: exp.lightAccent }}>
                            {exp.duration}
                        </span>
                    </div>
                </div>

                {/* Current badge */}
                {exp.current && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0'
                        style={{
                            background: 'rgba(124,58,237,0.15)',
                            border: '1px solid rgba(124,58,237,0.35)',
                            color: '#a78bfa',
                        }}>
                        <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse'></span>
                        Current
                    </span>
                )}
            </div>

            {/* Divider */}
            <div className='mb-5' style={{ height: '1px', background: 'var(--border)' }}></div>

            {/* Bullet points */}
            <ul className='space-y-3 mb-6'>
                {exp.bullets.map((b, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.07, duration: 0.4 }}
                        className='flex gap-3 text-sm leading-relaxed'
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <span className='mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0'
                            style={{ background: exp.accent }}></span>
                        {b}
                    </motion.li>
                ))}
            </ul>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
                {exp.tags.map(tag => (
                    <span key={tag} className='px-2.5 py-1 rounded-lg text-xs font-semibold'
                        style={{
                            background: `${exp.accent}18`,
                            border: `1px solid ${exp.accent}35`,
                            color: exp.lightAccent,
                        }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    </motion.div>
)

const Experience = () => {
    const handleDownload = () => saveAs(`${process.env.PUBLIC_URL}/CV.pdf`, 'Ayush-CV.pdf')

    return (
        <section className='py-24 relative'>
            {/* Background orb */}
            <div className='orb w-[600px] h-[400px] top-1/2 left-[-100px] -translate-y-1/2'
                style={{ background: 'rgba(124,58,237,0.06)' }}></div>
            <div className='orb w-[400px] h-[300px] bottom-0 right-[-50px]'
                style={{ background: 'rgba(6,182,212,0.04)' }}></div>

            <div className='max-w-6xl mx-auto px-6'>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-14'
                >
                    <span className='section-label'>Where I've Worked</span>
                    <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                        Experience
                    </h2>
                    <p className='mt-3 text-sm max-w-md mx-auto' style={{ color: 'var(--text-muted)' }}>
                        4+ years building production-grade web and mobile applications across Europe and India.
                    </p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className='glass-card rounded-2xl p-5 text-center'
                        >
                            <p className='font-display font-bold gradient-text' style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                                {s.value}
                            </p>
                            <p className='text-xs mt-1 font-medium' style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timeline */}
                <div className='relative max-w-3xl mx-auto'>
                    {/* Vertical gradient line */}
                    <div className='absolute left-[-24px] top-4 bottom-4 hidden md:block'
                        style={{ width: '2px', background: 'linear-gradient(to bottom, #7c3aed, #06b6d4)', opacity: 0.3, borderRadius: '2px' }}>
                    </div>

                    <div className='space-y-8'>
                        {experiences.map((exp, i) => (
                            <ExperienceCard key={exp.company} exp={exp} index={i} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className='flex justify-center mt-14'
                >
                    <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleDownload}
                        className='flex items-center gap-2 btn-primary px-7 py-3 rounded-xl text-white font-semibold text-sm'
                    >
                        <i className='fi fi-ss-download' style={{ fontSize: '0.8rem' }}></i>
                        Download Full CV
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}

export default Experience
