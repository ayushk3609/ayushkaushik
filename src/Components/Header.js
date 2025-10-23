import React, { useState, useEffect, useRef } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { saveAs } from 'file-saver'
import { useTheme } from '../Contexts/theme'
import '../index.css'
import translation, { SUPPORTED_LANG, useTranslation } from '../Contexts/language'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Header = () => {
    let location = useLocation()
    const { theme, toggleTheme } = useTheme()
    const { lang, setLang } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef(null)

    const handleChange = (e) => {
        setLang(e.target.value)
    }

    const handleDownload = () => {
        saveAs(`${process.env.PUBLIC_URL}/CV.pdf`, 'Ayush-CV.pdf');
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    return (
        <div className='flex justify-center'>
            <div className='w-4/5 md:w-4/5 lg:w-4/5 fixed flex flex-row justify-between items-center rounded-full nav z-50 px-4 md:px-6'>
                {/* Left Side - Logo and Desktop Navigation */}
                <div className='flex items-center flex-1'>
                    <h2 className='dancing-script text-lg md:text-xl lg:text-2xl'>Ayush Kaushik</h2>
                    
                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex nav-tab montserrat-alternates-medium ml-8'>
                        {
                            (location.pathname === '/') ? <>
                                <li className=''><ScrollLink className='cursor-pointer' to={'home'} smooth={true} duration={500} spy={true} activeClass='active'>{translation[lang].Home}</ScrollLink></li>
                                <li className=''><ScrollLink className='cursor-pointer' to={'projects'} smooth={true} duration={500} spy={true} activeClass='active'>{translation[lang].Project}</ScrollLink></li>
                                <li className=''><ScrollLink className='cursor-pointer' to={'blogs'} smooth={true} duration={500} spy={true} activeClass='active'>{translation[lang].Blog}</ScrollLink></li>
                                <li className=''><ScrollLink className='cursor-pointer' to={'contact'} smooth={true} duration={500} spy={true} activeClass='active'>{translation[lang].Contact}</ScrollLink></li>
                            </> : <>
                                <li><RouterLink to='/' className='cursor-pointer'>Home</RouterLink></li>
                            </>
                        }
                    </ul>
                </div>

                {/* Right Side - Desktop Controls */}
                <div className='hidden md:flex items-center gap-4 montserrat-alternates-medium'>
                    {
                        (location.pathname === '/') ? <>
                            <select onChange={handleChange} className='px-2 text-sm focus:outline-none dropdown' >
                                {
                                    SUPPORTED_LANG.map(lang => <option className='dropdownOption' key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                                }
                            </select>
                            <span className='text-2xl cursor-pointer' onClick={() => toggleTheme()} aria-label="Toggle theme">
                                {theme === 'dark' ? <i class="fi fi-ss-brightness"></i> : <i class="fi fi-rs-moon-stars"></i>}
                            </span>
                            <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn px-4 py-2 text-sm'> 
                                <span>CV</span>
                                <i class="fi fi-ss-download ml-1"></i>
                            </button>
                        </> :
                            <>
                                <span className='text-2xl cursor-pointer' onClick={() => toggleTheme()} aria-label="Toggle theme">
                                    {theme === 'dark' ? <i class="fi fi-ss-brightness"></i> : <i class="fi fi-rs-moon-stars"></i>}
                                </span>
                                <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn px-4 py-2 text-sm'> 
                                    <span>CV</span>
                                    <i class="fi fi-ss-download ml-1"></i>
                                </button>
                            </>
                    }
                </div>

                {/* Mobile Controls - Right Side */}
                <div className='md:hidden flex items-center gap-3'>
                    <span className='text-xl cursor-pointer' onClick={() => toggleTheme()} aria-label="Toggle theme">
                        {theme === 'dark' ? <i class="fi fi-ss-brightness"></i> : <i class="fi fi-rs-moon-stars"></i>}
                    </span>
                    <button 
                        onClick={toggleMobileMenu} 
                        className='text-xl cursor-pointer p-1'
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <i class="fi fi-ss-cross"></i> : <i class="fi fi-ss-menu-burger"></i>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div ref={mobileMenuRef} className={`absolute top-full left-0 right-0 mt-2 mx-4 rounded-lg shadow-lg border md:hidden mobile-menu ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
                        <div className='px-4 py-2'>
                            {(location.pathname === '/') && (
                                <ul className='flex flex-col space-y-2'>
                                    <li><ScrollLink className={`block px-4 py-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`} to={'home'} smooth={true} duration={500} onClick={closeMobileMenu}>{translation[lang].Home}</ScrollLink></li>
                                    <li><ScrollLink className={`block px-4 py-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`} to={'projects'} smooth={true} duration={500} onClick={closeMobileMenu}>{translation[lang].Project}</ScrollLink></li>
                                    <li><ScrollLink className={`block px-4 py-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`} to={'blogs'} smooth={true} duration={500} onClick={closeMobileMenu}>{translation[lang].Blog}</ScrollLink></li>
                                    <li><ScrollLink className={`block px-4 py-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`} to={'contact'} smooth={true} duration={500} onClick={closeMobileMenu}>{translation[lang].Contact}</ScrollLink></li>
                                </ul>
                            )}
                            <div className={`flex flex-col space-y-2 pt-2 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-200'}`}>
                                <select onChange={handleChange} className='px-4 py-2 text-sm focus:outline-none dropdown rounded-lg w-full'>
                                    {
                                        SUPPORTED_LANG.map(lang => <option className='dropdownOption' key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                                    }
                                </select>
                                <button onClick={handleDownload} className={`contact-btn px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium w-full transition-all duration-300 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-slate-500 hover:bg-slate-600 text-white'}`}>
                                    <span>Download CV</span>
                                    <i class="fi fi-ss-download"></i>
                                </button>
                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header