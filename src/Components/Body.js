import React from 'react'
import "../index.css"
import BodyContent from './BodyContent'
import HomePage from './HomePage'
import {ThemeProvider} from '../Contexts/theme'


const Body = () => {
  return (
    <ThemeProvider>
        <HomePage/>
        <BodyContent/>
    </ThemeProvider>
  )
}

export default Body