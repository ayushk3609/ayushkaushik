import React, { useEffect } from 'react'
import '../index.css'
import CrossPattern from './Pattern/CrossPattern'
import { posts } from './Constants'
import { useTheme } from '../Contexts/theme'
import DotPattern from './Pattern/DotPattern'
import { useLocation } from 'react-router-dom'

const BlogPage = () => {
  const { theme } = useTheme()
  let location = useLocation()
  const textColor = (theme === 'dark') ? 'text-white' : 'text-black'
  const designColor = (theme === 'dark') ? 'white' : 'black'

  useEffect(() => {
    window.scrollTo(0,0)
  },[location.pathname])

  return (
    <div className='blogpage'>
      <div className={`w-4/5 relative m-auto px-4 md:px-16 pt-16 md:pt-32 ${textColor}`}>
        <div className='absolute right-0 hidden md:block'>
          <CrossPattern w={'100px'} outline={designColor} fill={'transparent'} />
        </div>
        <div>
          <h2 className='text-4xl md:text-7xl montserrat-alternates-medium'>My Blog Page</h2>
        </div>
        <div className='pt-8 md:pt-16'>

          {posts.map((post, index) => (
            <div key={index} className='px-2 md:px-4 py-8 md:py-12'>
              <h2 className='text-2xl md:text-4xl font-semibold mb-4'>{post.title}</h2>
              
              {/* Mobile Layout: Stack vertically */}
              <div className='md:hidden mobile-blog-post'>
                <div className='w-full mb-4'>
                  <img className='w-full h-auto object-cover rounded-lg shadow-lg' src={post.img} alt={post.title} />
                </div>
                <div className='w-full'>
                  <p className='text-base leading-relaxed mb-6'>{post.desc}</p>
                  <div className='flex justify-center'>
                    <a 
                      className='px-6 py-3 rounded-full bg-blue-400 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105' 
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Grid layout */}
              <div className='hidden md:grid grid-cols-3 gap-8 pt-16'>
                <div className='col-span-1'>
                  <img className='h-[250px] w-full object-cover rounded-lg' src={post.img} alt={post.title} />
                </div>
                <div className='col-span-2'>
                  <p className='text-xl leading-relaxed'>{post.desc}</p>
                  <div className='pt-12 flex justify-center'>
                    <a 
                      className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg' 
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className='absolute hidden md:flex flex-col pt-24 top-64 -right-24'>
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
        </div>
      </div>

      <div className={`px-4 md:px-32 pt-8 md:pt-16 text-3xl md:text-5xl ${textColor}`}>
        <h3 className='px-2 md:px-8 montserrat-alternates-medium text-center'>End of Blog Page</h3>
      </div>

      <div className='px-4 md:px-32'>
        <div className='border-2 border-blue-700'></div>
      </div>
      
      <div className='text-center pt-4 pb-8'>
        <h2 className='text-xs md:text-sm text-slate-500'>&copy;2024 Ayush Kaushik. All rights reserved.</h2>
      </div>
    </div>
  )
}

export default BlogPage