import React from 'react'
import '../index.css'
import AboutPc from '../Assets/AboutPc.jpeg'
import { useTheme } from '../Contexts/theme'
import DotPattern from './Pattern/DotPattern'
import Arrow from '../Assets/Arrow.svg'
import { Link } from 'react-scroll'
import translation, { useTranslation } from '../Contexts/language'



const About = () => {
    const { theme } = useTheme()
    const {lang} = useTranslation()
    const textColor = (theme === 'dark') ? 'text-white' : 'text-black'
    return (
        <div className='about relative w-4/5 pt-28 px-4 md:px-16 m-auto'>
            <div className='flex flex-col md:flex-row relative p-4 md:p-8'>
                <div className='w-[150px] absolute top-0 right-0 hidden md:block'>
                    <img src={Arrow} alt="" />
                </div>
                <div className='relative flex justify-center md:justify-start'>
                    <div className='bg-center bg-cover'>
                        <img className='w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full' src={AboutPc} alt="" />
                    </div>
                    <div className='absolute top-0 right-4 w-16 text-4xl md:text-7xl montserrat-alternates-medium'>
                        <h2 className={textColor}>{translation[lang].about}</h2>
                    </div>
                </div>
                <div className='w-full md:w-3/5 pl-0 md:pl-16 pt-8 md:pt-36 about-info text-lg'>
                    <p className={textColor}>{translation[lang].aboutdesc}</p>
                    <div className='pt-12 pb-4'>
                        <Link to='skills' smooth={true} duration={500} className={`py-2 px-8 bg-blue-700 hover:bg-blue-500 cursor-pointer rounded-full ${textColor}`}>{translation[lang].aboutbtn}</Link>
                    </div>
                </div>
            </div>
            <div className='absolute pt-24 top-64 -right-24 hidden md:block'>
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
            </div>
        </div>
    )
}

export default About