import React from 'react'
import '../index.css'
import CrossPattern from './Pattern/CrossPattern'
import { posts } from './Constants'
import Meter from './Meter'
import { useTheme } from '../Contexts/theme'
import DotPattern from './Pattern/DotPattern'

const BlogPage = () => {
  const { theme } = useTheme()
  const textColor = (theme === 'dark') ? 'text-white' : 'text-black'
  const designColor = (theme === 'dark') ? 'white' : 'black'
  return (
    <div className='blogpage'>
      <div className={`w-4/5 relative m-auto px-16 pt-32 ${textColor}`}>
        <div className='absolute right-0'>
          <CrossPattern w={'100px'} outline={designColor} fill={'transparent'} />
        </div>
        <div>
          <h2 className=' text-7xl  montserrat-alternates-medium'>My Blog Page</h2>
        </div>
        <div className='pt-16'>

          {posts.map(post => <div className='px-4 py-12'>
            <h2 className='text-4xl'>{post.title}</h2>
            <div className='grid grid-cols-3 gap-8 pt-16'>
              <div className='col-span-1'>
                <img className='h-[250px]' src={post.img} alt="" />
              </div>
              <div className='col-span-2'>
                <p className='text-xl'>{post.desc}</p>
                <div className='pt-12 flex justify-center'>
                  <a className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700' href={post.url}>Read More</a>
                </div>
              </div>
            </div>
          </div>)
          }

        </div>

        <div className='absolute flex flex-col pt-24 top-64 -right-24'>
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
          <DotPattern color={'white'} />
        </div>
      </div>

      <div className='px-32 pt-16 text-5xl text-white'>
        <h3 className='px-8 montserrat-alternates-medium'>End of Blog Page</h3>
      </div>

      <div className='px-32'>
        <div className='border-2 border-blue-700'></div>
      </div>
      
      <div className='text-center pt-4'>
        <h2 className='text-sm text-slate-500'>&copy;2024 Ayush Kaushik. All rights reserved.</h2>
      </div>
    </div>
  )
}

export default BlogPage