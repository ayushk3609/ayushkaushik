import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import { ReactTyped } from 'react-typed';
import Blob from './Pattern/Blob';
import useOnScreen from '../Hooks/useOnScreen';
import me from '../Assets/Mee.jpg'
import translation, { useTranslation } from '../Contexts/language';





const Intro = () => {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    const active = useOnScreen(ref)
    const {lang} = useTranslation()
    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                setVisible(true)
            }, 6000)

            return () => clearTimeout(timer)
        } else {
            setVisible(false)
        }
    }, [active, visible, lang])

    return (
        <div ref={ref} className='flex w-full intro pt-16 md:pt-16 min-h-screen'>
            {/* Background text - positioned differently for mobile vs desktop */}
            <div className='hidden md:block h-screen'>
                {
                    visible && <h2 className='bungee-outline-regular text-center text-[200px] opacity-75'>Front-End Developer</h2>
                }
            </div>
            
            <div className='absolute left-0 w-full flex flex-col md:flex-row justify-around px-4 md:px-16 lobster-regular'>
                {/* Mobile Layout: Image on top, text below */}
                <div className='md:hidden w-full flex flex-col items-center pt-8 pb-4'>
                    {/* Image and Blob for Mobile */}
                    <div className='mobile-image-container'>
                        <div className='relative w-[200px] h-[200px]'>
                            {/* Blob Container */}
                            <div className='absolute inset-0 w-full h-full'>
                                <Blob />
                            </div>
                            {/* Professional Image */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='professional-image'>
                                    <img 
                                        className='w-full h-full object-cover object-center' 
                                        src={me} 
                                        alt="Ayush Kaushik - Frontend Developer" 
                                    />
                                    {/* Professional overlay gradient */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Intro Text for Mobile */}
                    <div className='mobile-text-container'>
                        {active && <ReactTyped
                            strings={translation[lang].intro}
                            typeSpeed={50}
                            backSpeed={50}
                            loop={false}
                            showCursor={true}
                            cursorChar='|'
                            onComplete={() => {
                                const cursor = document.querySelector('.typed-cursor')
                                if (cursor) cursor.style.display = 'none';
                            }}
                        />}
                    </div>
                    
                    {/* Mobile background text - appears below intro content */}
                    <div className='w-full flex justify-center mobile-background-text mt-4'>
                        {
                            visible && <h2 className='bungee-outline-regular text-center text-[60px] sm:text-[100px] opacity-75'>Front-End Developer</h2>
                        }
                    </div>
                </div>

                {/* Desktop Layout: Text on left, image on right */}
                <div className='hidden md:flex w-full justify-around'>
                    <div className='mt-32 absolute left-20 w-1/3 text-6xl leading-relaxed'>
                        {active && <ReactTyped
                            strings={translation[lang].intro}
                            typeSpeed={50}
                            backSpeed={50}
                            loop={false}
                            showCursor={true}
                            cursorChar='|'
                            onComplete={() => {
                                const cursor = document.querySelector('.typed-cursor')
                                if (cursor) cursor.style.display = 'none';
                            }}
                        />}
                    </div>
                    <div className='w-2/5 absolute pt-24 right-24 flex justify-end'>
                        <div className='relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px]'>
                            {/* Blob Container */}
                            <div className='absolute inset-0 w-full h-full'>
                                <Blob />
                            </div>
                            {/* Professional Image */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='professional-image'>
                                    <img 
                                        className='w-full h-full object-cover object-center' 
                                        src={me} 
                                        alt="Ayush Kaushik - Frontend Developer" 
                                    />
                                    {/* Professional overlay gradient */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-full'></div>
                                </div>
                            </div>
                            {/* Floating elements for professional look */}
                            <div className='absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full floating-element'></div>
                            <div className='absolute bottom-8 left-6 w-2 h-2 bg-purple-400 rounded-full floating-element'></div>
                            <div className='absolute top-1/2 left-2 w-1.5 h-1.5 bg-green-400 rounded-full floating-element'></div>
                            <div className='absolute top-1/4 right-8 w-1 h-1 bg-yellow-400 rounded-full floating-element'></div>
                            <div className='absolute bottom-1/4 right-2 w-2.5 h-2.5 bg-pink-400 rounded-full floating-element'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="social absolute text-white pt-36 right-2 md:right-4">
                <div className='flex flex-col'>
                    <div className='icons'>
                        <a href="https://www.instagram.com/ayush.coshik/"><i class="fi fi-brands-instagram cursor-pointer"></i></a>
                    </div>
                    <div className='icons'>
                        <a href="https://www.linkedin.com/in/ayush-kaushik-62008315a/"><i class="fi fi-brands-linkedin cursor-pointer"></i></a>
                    </div>
                    <div className='icons'>
                        <a href="https://github.com/ayushk3609"><i class="fi fi-brands-github cursor-pointer"></i></a>
                    </div>
                    <div className='icons'>
                        <a href="https://discord.com/channels/755433373463216278/755433373463216281"><i class="fi fi-brands-discord cursor-pointer"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro