import React from 'react'
import { useTheme } from '../Contexts/theme'

const BlogCard = ({post}) => {
    const {title,img,desc,url} = post
    const {theme} = useTheme()
    const textColor = (theme==='dark')?'text-white':'text-black'
  return (
    <div className='w-full max-w-[380px] mx-auto mobile-blog-card'>
        <div className='w-full overflow-hidden rounded-xl'>
            <img className='rounded-xl w-full h-auto object-cover transition-transform duration-300 hover:scale-105' src={img} alt="" />
        </div>
        <div className={textColor}>
            <h2 className='text-xl md:text-2xl py-4 font-semibold'>{title}</h2>
            <p className='text-sm md:text-base leading-relaxed'>{desc}</p>
        </div>
        <div>
            <button className={`py-4 ${theme === 'dark'?'text-blue-600':'text-white'} hover:underline transition-all duration-300 font-medium`}>{'Read more >>'}</button>
        </div>
    </div>
  )
}

export default BlogCard