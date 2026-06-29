import React, { useRef, useState, useEffect } from 'react'
import '../index.css'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Projects from './Projects'
import Blogs from './Blogs'
import Contact from './Contact'
import { Element } from 'react-scroll'
import Intro from './Intro'
import Footer from './Footer'
import StickyCanvas from './three/StickyCanvas'
import useOnScreen from '../Hooks/useOnScreen'
import { useScrollScene } from '../Hooks/useScrollScene'
import { SCROLL_STATES } from './three/scroll-states'

const BodyContent = () => {
    const sceneRef = useRef(null)
    const introRef = useRef(null)
    const heroVisible = useOnScreen(introRef)
    const { sectionIndex } = useScrollScene()
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (sceneRef.current?.setTarget) {
            sceneRef.current.setTarget(SCROLL_STATES[sectionIndex] ?? SCROLL_STATES[0])
        }
    }, [sectionIndex])

    return (
        <div className='bodyContent'>
            <StickyCanvas
                sceneRef={sceneRef}
                sectionIndex={sectionIndex}
                pointerActive={heroVisible && !isMobile && sectionIndex === 0}
            />
            <Element name='home'>
                <Intro sectionRef={introRef} />
            </Element>
            <Element name='about'>
                <About />
            </Element>
            <Element name='skills'>
                <Skills />
            </Element>
            <Element name='experience'>
                <Experience />
            </Element>
            <Element name='projects'>
                <Projects />
            </Element>
            <Element name='blogs'>
                <Blogs />
            </Element>
            <Element name='contact'>
                <Contact />
            </Element>
            <Footer />
        </div>
    )
}

export default BodyContent
