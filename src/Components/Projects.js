import React from 'react'
import { motion } from 'framer-motion'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const projects = [
    {
        name: 'NetflixGPT',
        live: 'https://netflixgpt-817c9.web.app/browse',
        desc: 'A Netflix-inspired UI powered by Gemini AI for personalized movie recommendations, with secure authentication and an intuitive discovery experience.',
        github: 'https://github.com/ayushk3609/NetflixGPT',
        image: 'https://res.cloudinary.com/heaven3609/image/upload/v1715455196/NetflixGPT_pbf9q9.png',
        tags: ['React', 'Gemini AI', 'Firebase'],
        accent: 'rgba(239,68,68,0.15)',
        accentBorder: 'rgba(239,68,68,0.25)',
    },
    {
        name: 'EasyShop',
        live: 'https://easyshop-04k3.onrender.com/products',
        desc: 'Full-stack e-commerce platform with role-based access for retailers and customers. Supports CRUD operations, product browsing, and secure authentication.',
        github: 'https://github.com/ayushk3609/EasyShop',
        image: 'https://res.cloudinary.com/heaven3609/image/upload/v1720375637/Untitled_design_zbjdop.png',
        tags: ['Node.js', 'Express', 'EJS', 'MongoDB'],
        accent: 'rgba(16,185,129,0.15)',
        accentBorder: 'rgba(16,185,129,0.25)',
    },
    {
        name: 'The Weather App',
        live: 'https://theweatherapp01.netlify.app/',
        desc: 'Real-time weather application built with Vanilla JavaScript. Delivers current conditions with a visually stunning UI and live API data.',
        github: 'https://github.com/ayushk3609/Weather-app',
        image: 'https://res.cloudinary.com/heaven3609/image/upload/v1720530760/Screenshot_2024-07-09_184219_tzvgh6.png',
        tags: ['JavaScript', 'Weather API', 'CSS'],
        accent: 'rgba(6,182,212,0.15)',
        accentBorder: 'rgba(6,182,212,0.25)',
    },
    {
        name: 'Classic Snake Game',
        live: 'https://sensational-crostata-5c9469.netlify.app/',
        desc: 'A classic Snake game using HTML5 Canvas and Vanilla JavaScript with multiple difficulty levels and smooth gameplay mechanics.',
        github: 'https://github.com/ayushk3609/Snake-Game',
        image: 'https://www.classicgame.com/uploaded/game/screenshot/classic-snake800.webp',
        tags: ['JavaScript', 'HTML5 Canvas', 'Game Dev'],
        accent: 'rgba(245,158,11,0.15)',
        accentBorder: 'rgba(245,158,11,0.25)',
    },
]

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className='glass-card rounded-2xl overflow-hidden flex flex-col group'
    >
        {/* Image */}
        <div className='relative h-48 overflow-hidden flex-shrink-0'>
            <img
                src={project.image}
                alt={project.name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            {/* Overlay gradient */}
            <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(6,6,15,0.7) 0%, transparent 60%)' }}></div>

            {/* Tags overlay on image */}
            <div className='absolute bottom-3 left-3 flex flex-wrap gap-1.5'>
                {project.tags.map(tag => (
                    <span key={tag} className='tag-pill' style={{ backdropFilter: 'blur(8px)', background: project.accent, borderColor: project.accentBorder, color: 'rgba(255,255,255,0.9)' }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Content */}
        <div className='p-6 flex flex-col flex-1 space-y-3'>
            <h3 className='font-display font-bold text-xl' style={{ color: 'var(--text)' }}>{project.name}</h3>
            <p className='text-sm leading-relaxed flex-1' style={{ color: 'var(--text-muted)' }}>{project.desc}</p>

            {/* Links */}
            <div className='flex gap-3 pt-2'>
                <motion.a
                    href={project.live}
                    target='_blank'
                    rel='noreferrer'
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className='btn-primary flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center flex items-center justify-center gap-2'
                >
                    <i className='fi fi-br-arrow-up-right-from-square' style={{ fontSize: '0.7rem' }}></i>
                    Live Demo
                </motion.a>
                <motion.a
                    href={project.github}
                    target='_blank'
                    rel='noreferrer'
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className='btn-ghost flex-1 py-2.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2'
                    style={{ color: 'var(--text)' }}
                >
                    <i className='fi fi-brands-github' style={{ fontSize: '0.85rem' }}></i>
                    GitHub
                </motion.a>
            </div>
        </div>
    </motion.div>
)

const Projects = () => {
    const { lang } = useTranslation()

    return (
        <section className='py-24 relative'>
            <div className='orb w-[500px] h-[400px] bottom-0 left-1/2 -translate-x-1/2' style={{ background: 'rgba(124,58,237,0.05)' }}></div>

            <div className='max-w-6xl mx-auto px-6'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-14'
                >
                    <span className='section-label'>My Work</span>
                    <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                        {translation[lang].project}
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.name} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
