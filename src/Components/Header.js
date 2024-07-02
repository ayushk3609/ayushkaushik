import React from 'react'
import { Link } from 'react-scroll'
import { saveAs } from 'file-saver'
import { useTheme } from '../Contexts/theme'


const Header = () => {
    const {theme, toggleTheme} = useTheme()
    const handleDownload = () => {
        saveAs('../Assets/CV.pdf','Ayush_CV.pdf');
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
                <div className='nav-right p-4 montserrat-alternates-medium'>
                    <button onClick={() => toggleTheme()}>{theme==='dark'?'Light':'Dark'}</button>
                    <button onClick={handleDownload} className='rounded-full bg-slate-500 contact-btn'> <span className='px-2'>CV</span><i class="fi fi-ss-download"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Header