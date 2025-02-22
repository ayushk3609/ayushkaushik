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
        <div className='about relative w-4/5 pt-28 px-16 m-auto'>
            <div className='flex relative p-8'>
                <div className='w-[150px] absolute top-0 right-0'>
                    <img src={Arrow} alt="" />
                </div>
                <div className=' relative'>
                    <div className='bg-center bg-cover'>
                        <img className='w-[350px] h-[350px] rounded-full' src={AboutPc} alt="" />
                    </div>
                    <div className='absolute top-0 right-4 w-16 text-7xl montserrat-alternates-medium'>
                        <h2 className={textColor}>{translation[lang].about}</h2>
                    </div>

                </div>
                <div className='w-3/5 pl-16 pt-36 about-info text-lg'>
                    <p className={textColor}>{translation[lang].aboutdesc}</p>
                    <div className='pt-12 pb-4'>
                        <Link to='skills' smooth={true} duration={500} className={`py-2 px-8 bg-blue-700 hover:bg-blue-500 cursor-pointer rounded-full ${textColor}`}>{translation[lang].aboutbtn}</Link>
                    </div>
                </div>


            </div>
            <div className='absolute pt-24 top-64 -right-24'>
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
            </div>

        </div>
    )
}

export default About