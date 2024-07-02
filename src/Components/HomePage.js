import React from 'react'
import Intro from './Intro'
import Header from './Header'
import '../index.css'
import { Element } from 'react-scroll'

const HomePage = () => {
  return (
    <div className='homepage'>
      <Element name='home' >
        <Header />
        <Intro />
      </Element>

    </div>
  )
}

export default HomePage