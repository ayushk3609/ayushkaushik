import React from 'react'
import '../index.css'

const BlogCard = ({ post }) => {
    const { title, img, desc, url } = post
    return (
        <div className='glass-card rounded-2xl overflow-hidden flex flex-col group' style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
            <div className='h-48 overflow-hidden flex-shrink-0'>
                <img
                    src={img}
                    alt={title}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
            </div>
            <div className='p-5 flex flex-col flex-1 space-y-3'>
                <h2 className='font-display font-semibold text-lg leading-snug' style={{ color: 'var(--text)' }}>{title}</h2>
                <p className='text-sm leading-relaxed line-clamp-3 flex-1' style={{ color: 'var(--text-muted)' }}>{desc}</p>
                {url ? (
                    <a
                        href={url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-sm font-semibold flex items-center gap-1 transition-colors'
                        style={{ color: '#a78bfa', textDecoration: 'none' }}
                    >
                        Read article <i className='fi fi-br-arrow-right' style={{ fontSize: '0.7rem' }}></i>
                    </a>
                ) : (
                    <span className='text-xs' style={{ color: 'var(--text-muted)', opacity: 0.5 }}>Coming soon</span>
                )}
            </div>
        </div>
    )
}

export default BlogCard
