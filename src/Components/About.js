import React from 'react'
import '../index.css'
import AboutPc from '../Assets/AboutPc.jpeg'
import { useTheme } from '../Contexts/theme'
import DotPattern from './Pattern/DotPattern'
import Arrow from '../Assets/Arrow.svg'
import { Link } from 'react-scroll'



const About = () => {
    const { theme } = useTheme()
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
                        <h2 className={textColor}>About Me</h2>
                    </div>

                </div>
                <div className='w-3/5 pl-16 pt-36 about-info text-lg'>
                    <p className={textColor}>A cooperative team player and a proven leader with an experience in developing code effective, maintainable and scalable web applications.
                        A technology geek with great enthusiasm to delve into new technologies and take up the challenge. A Javascript nerd and currently a React admirer.</p>
                    <div className='pt-12 pb-4'>
                        <Link to='skills' smooth={true} duration={500} className={`py-2 px-8 bg-blue-600 cursor-pointer rounded-full ${textColor}`}>Explore</Link>
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