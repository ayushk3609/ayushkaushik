import React from 'react'
import { useTheme } from '../Contexts/theme'

const BlogCard = ({post}) => {
    const {title,img,desc,url} = post
    const {theme} = useTheme()
    const textColor = (theme==='dark')?'text-white':'text-black'
  return (
    <div className='w-[380px]'>
        <div className='w-[380px]'>
            <img className='rounded-xl' src={img} alt="" />
        </div>
        <div className={textColor}>
            <h2 className='text-2xl py-4'>{title}</h2>
            <p className='text-sm'>{desc}</p>
        </div>
        <div>
            <button className={`py-4 ${theme === 'dark'?'text-blue-600':'text-white'}`}>{'Read more >>'}</button>
        </div>
    </div>
  )
}

export default BlogCard