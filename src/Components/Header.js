import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { saveAs } from 'file-saver'
import { useTheme } from '../Contexts/theme'
import '../index.css'


const Header = () => {
    const { theme, toggleTheme } = useTheme()
    const [openDropDown, setOpenDropDown] = useState(false)
    const handleDrop = () => {
        setOpenDropDown(prev => !prev)
    }
    const handleDownload = () => {
        saveAs('../Assets/CV.pdf', 'Ayush_CV.pdf');
    }
    return (
        <div className=' pt-2 flex justify-center'>
            <div className='w-4/5 fixed flex flex-row justify-between rounded-full nav z-50'>
                <div className='nav-left flex'>
                    <h2 className='dancing-script'>Ayush Kaushik</h2>
                    <ul className='flex nav-tab montserrat-alternates-medium'>
                        <li className='divide-y divide-solid '><Link to={'home'} smooth={true} duration={500}>Home</Link></li>
                        <li><Link to={'projects'} smooth={true} duration={500}>Project</Link></li>
                        <li><Link to={'blogs'} smooth={true} duration={500}>Blogs</Link></li>
                        <li><Link to={'contact'} smooth={true} duration={500}>Contact</Link></li>
                    </ul>
                </div>
                <div className='nav-right flex justify-center items-center p-4 montserrat-alternates-medium'>
                    <div>
                        <div className='px-2'>
                            <i onClick={handleDrop} class="fi fi-ss-language text-3xl cursor-pointer"></i>
                        </div>
                        {
                            openDropDown && <div className='flex flex-col z-50 dropdown'>
                                <ul className='flex flex-col gap-1 cursor-pointer text-xs'>
                                    <li className='py-2'>English</li>
                                    <li className='py-2'>Hindi</li>
                                    <li className='py-2'>Deutsch</li>
                                </ul>
                            </div>
                        }
                    </div>
                    <span className=' px-4 text-3xl ' onClick={() => toggleTheme()}>{theme === 'dark' ? <i class="fi fi-ss-brightness cursor-pointer"></i> : <i className="fi fi-rs-moon-stars cursor-pointer"></i>}</span>
                    <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn px-6 py-4'> <span className=''>CV</span><i class="fi fi-ss-download"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Header