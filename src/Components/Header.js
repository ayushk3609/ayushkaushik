import React from 'react'
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

    const handleChange = (e) => {
        setLang(e.target.value)
    }

    const handleDownload = () => {
        saveAs(`${process.env.PUBLIC_URL}/CV.pdf`, 'Ayush-CV.pdf');
    }
    return (
        <div className=' flex justify-center'>
            <div className='w-4/5 fixed flex flex-row justify-between rounded-full nav z-50'>
                <div className='nav-left flex'>
                    <h2 className='dancing-script'>Ayush Kaushik</h2>
                    <ul className='flex nav-tab montserrat-alternates-medium'>
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
                <div className='nav-right flex justify-center items-center p-4 montserrat-alternates-medium'>
                    {
                        (location.pathname === '/') ? <>
                            <select onChange={handleChange} className='px-2 md:px-2 md:text-sm focus:outline-none dropdown' >
                                {
                                    SUPPORTED_LANG.map(lang => <option className='dropdownOption' key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                                }
                            </select>
                            <span className=' px-4 text-3xl ' onClick={() => toggleTheme()}>{theme === 'dark' ? <i class="fi fi-ss-brightness cursor-pointer"></i> : <i className="fi fi-rs-moon-stars cursor-pointer"></i>}</span>
                            <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn px-6 py-4'> <span className=''>CV</span><i class="fi fi-ss-download"></i></button>
                        </> :
                            <>
                                <span className=' px-4 text-3xl ' onClick={() => toggleTheme()}>{theme === 'dark' ? <i class="fi fi-ss-brightness cursor-pointer"></i> : <i className="fi fi-rs-moon-stars cursor-pointer"></i>}</span>
                                <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn px-6 py-4'> <span className=''>CV</span><i class="fi fi-ss-download"></i></button>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Header