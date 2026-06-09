import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from './Constants'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const BlogCard = ({ post, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.55 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className='glass-card rounded-2xl overflow-hidden flex flex-col group'
    >
        {/* Image */}
        <div className='h-44 overflow-hidden flex-shrink-0'>
            <img
                src={post.img}
                alt={post.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
        </div>

        {/* Content */}
        <div className='p-5 flex flex-col flex-1 space-y-3'>
            <h3 className='font-display font-semibold text-base leading-snug' style={{ color: 'var(--text)' }}>
                {post.title}
            </h3>
            <p className='text-sm leading-relaxed line-clamp-3 flex-1' style={{ color: 'var(--text-muted)' }}>
                {post.desc}
            </p>
            {post.url ? (
                <a
                    href={post.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm font-semibold flex items-center gap-1 mt-1 transition-colors'
                    style={{ color: '#a78bfa' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
                >
                    Read article <i className='fi fi-br-arrow-right' style={{ fontSize: '0.7rem' }}></i>
                </a>
            ) : (
                <span className='text-xs font-medium mt-1' style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                    Coming soon
                </span>
            )}
        </div>
    </motion.div>
)

const Blogs = () => {
    const { lang } = useTranslation()

    return (
        <section className='py-24 relative'>
            <div className='max-w-6xl mx-auto px-6'>
                {/* Header row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14'
                >
                    <div>
                        <span className='section-label'>My Writing</span>
                        <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                            {translation[lang].blogs}
                        </h2>
                    </div>
                    <Link to='/blogpage'>
                        <motion.button
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className='btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2'
                            style={{ color: 'var(--text)' }}
                        >
                            {translation[lang].blogbtn}
                            <i className='fi fi-br-arrow-right' style={{ fontSize: '0.75rem' }}></i>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {posts.map((post, i) => (
                        <BlogCard key={post.title} post={post} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blogs
