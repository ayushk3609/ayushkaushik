import React from 'react'
import '../index.css'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Blogs from './Blogs'
import Contact from './Contact'
import { Element } from 'react-scroll'
import Intro from './Intro'
import Footer from './Footer'


const BodyContent = () => {
  return (
    <div className='bodyContent'>
      <Element name='home' >
        <Intro />
      </Element>
      <Element name='about'>
        <About />
      </Element>
      <Element name='skills'>
        <Skills />
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
      <Footer/>
    </div>
  )
}

export default BodyContent