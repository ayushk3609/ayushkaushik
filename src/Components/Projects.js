import React from 'react'
import Carousel from './Carousel'
import { useTheme } from '../Contexts/theme'

const Projects = () => {
  const {theme} = useTheme()
  const textColor = (theme==='dark')?'text-white':'text-black'
  return (
    <div className={`w-4/5 relative pt-32 m-auto ${textColor}`}>
        <div className='text-7xl px-4 absolute right-10'>
            <h2 className='montserrat-alternates-medium'>My Projects</h2>
        </div>
        <div className='py-16'>
            <Carousel/>
        </div>
    </div>
  )
}

export default Projects