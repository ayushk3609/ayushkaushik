import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import { ReactTyped } from 'react-typed';
import Blob from './Pattern/Blob';
import useOnScreen from '../Hooks/useOnScreen';




const Intro = () => {
    const [visible,setVisible] = useState(false)
    const ref = useRef()
    const active = useOnScreen(ref)
    useEffect(()=> {
        if(active){
            const timer = setTimeout(() => {
                setVisible(true)
            },6000)
    
            return ()=> clearTimeout(timer)
        }else{
            setVisible(false)
        }
    },[active,visible])
    
    return (
        <div ref={ref} className='flex w-full intro pt-16'>
            <div className=' h-screen'>
                {
                    visible &&  <h2 className='bungee-outline-regular text-center text-[200px] opacity-75 '>Front-End Developer</h2>

                }
            </div>
            <div className='absolute left-0 w-full flex justify-around px-16 lobster-regular'>
                <div className='mt-32 absolute left-20 w-1/3 text-6xl leading-relaxed'>
                   {active && <ReactTyped
                     strings={['Hello,',
                     "Hello, My name is Ayush Kaushik",
                     "Hello, My name is Ayush Kaushik and I am a ..."]}
                     typeSpeed={50}
                     backSpeed={50}
                     loop={false}
                     showCursor={true}
                     cursorChar='|'
                     onComplete={()=>{
                        const cursor = document.querySelector('.typed-cursor')
                        if(cursor) cursor.style.display = 'none';
                     }}
                    />}
                </div>
                <div className='w-2/5 absolute pt-24 right-24'>
                    <Blob/>
                </div>
            </div>
            <div className="social absolute text-white pt-36 right-4">
                <div className='flex flex-col'>
                    <div className='icons'>
                        <i class="fi fi-brands-instagram"></i>
                    </div>
                    <div className='icons'>
                        <i class="fi fi-brands-linkedin"></i>
                    </div>
                    <div className='icons'>
                        <i class="fi fi-brands-github"></i>
                    </div>
                    <div className='icons'>
                        <i class="fi fi-brands-discord"></i>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Intro