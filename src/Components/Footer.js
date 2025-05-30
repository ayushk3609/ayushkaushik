import React from 'react'
import Meter from './Meter'
import '../index.css'
import CrossPattern from './Pattern/CrossPattern'
import { Link } from 'react-scroll'
import translation, { useTranslation } from '../Contexts/language'

const Footer = () => {
    const {lang} = useTranslation()
  return (
    <div className='w-4/5 m-auto text-white pt-16'>
        <div>
            <div className='py-8 -translate-x-16'>
              <CrossPattern w={'70px'} outline={'blue'} fill={'transparent'} />
            </div>
            <div className='grid grid-cols-6'>
                <div className='px-8 col-span-3 '>
                    <h2 className='text-7xl montserrat-alternates-medium'>{translation[lang].follow}</h2>
                </div>
                <div className='flex justify-around items-center col-span-3 text-2xl pt-8'>
                    <div className='rounded-full'><a href="https://www.instagram.com/ayush.coshik/"><i class="fi fi-brands-instagram"></i></a></div>
                    <div className='rounded-full'><a href="https://github.com/ayushk3609"><i class="fi fi-brands-github"></i></a></div>
                    <div className='rounded-full'><a href="https://www.linkedin.com/in/ayush-kaushik-62008315a/"><i class="fi fi-brands-linkedin"></i></a></div>
                    <div className='rounded-full'><a href="mailto:ayushcoshik@gmail.com"><i class="fi fi-ss-at"></i></a></div>
                </div>
            </div>
            <div className='flex px-8 py-12'>
                <Meter/>
                <Meter/>
            </div>
        </div>
        <div className='py-8'> 
            <div  className='border-2 border-blue-700'></div>
        </div>
        <div className='flex justify-between '>
            <div className='px-2 py-2'>
                <h2 className='text-4xl dancing-script'>Ayush Kaushik</h2>
            </div>
            <div>
                <ul className='flex f-list montserrat-alternates-medium'>
                    <li><Link to='home' smooth={true} duration={500}>{translation[lang].Home}</Link></li>
                    <li><Link to="projects" smooth={true} duration={500}>{translation[lang].Project}</Link></li>
                    <li><Link to="blogs" smooth={true} duration={500}>{translation[lang].Blog}</Link></li>
                    <li><Link to="contact" smooth={true} duration={500}>{translation[lang].Contact}</Link></li>
                </ul>
            </div>
        </div>
        <div className='text-center pt-4'>
            <h2 className='text-sm text-slate-500'>&copy;2024 Ayush Kaushik. All rights reserved.</h2>
        </div>
    </div>
  )
}

export default Footer;