import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import { ReactTyped } from 'react-typed';
import Blob from './Pattern/Blob';
import useOnScreen from '../Hooks/useOnScreen';
import me from '../Assets/Mee.png'
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
        <div ref={ref} className='flex w-full intro pt-16'>
            <div className=' h-screen'>
                {
                    visible && <h2 className='bungee-outline-regular text-center text-[200px] opacity-75 '>Front-End Developer</h2>

                }
            </div>
            <div className='absolute left-0 w-full flex justify-around px-16 lobster-regular'>
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
                <div className='w-2/5 absolute pt-24 right-24'>
                    <img className='w-[250px] absolute right-32 bottom-24' src={me} alt="" />
                    <Blob />

                </div>
            </div>
            <div className="social absolute text-white pt-36 right-4">
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