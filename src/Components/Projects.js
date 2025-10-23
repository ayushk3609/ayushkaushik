import React from 'react'
import Carousel from './Carousel'
import { useTheme } from '../Contexts/theme'
import translation, { useTranslation } from '../Contexts/language'

const Projects = () => {
  const {theme} = useTheme()
  const {lang} = useTranslation()
  const textColor = (theme==='dark')?'text-white':'text-black'
  return (
    <div className={`w-4/5 relative pt-16 md:pt-32 m-auto ${textColor}`}>
        <div className='text-4xl md:text-7xl px-4 absolute right-4 md:right-10'>
            <h2 className='montserrat-alternates-medium'>{translation[lang].project}</h2>
        </div>
        <div className='py-8 md:py-16'>
            <Carousel/>
        </div>
    </div>
  )
}

export default Projects