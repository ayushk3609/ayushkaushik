import React from 'react'
import BlogCard from './BlogCard'
import CrossPattern from './Pattern/CrossPattern'
import { useTheme } from '../Contexts/theme'
import translation, { useTranslation } from '../Contexts/language'
import { Link } from 'react-router-dom'
import { posts } from './Constants'


const Blogs = () => {

    const {theme} = useTheme()
    const {lang} = useTranslation()
    const textColor = (theme==='dark')?'text-white':'text-black'
    
    return (
        <div className='w-4/5 relative m-auto px-16 pt-32'>
            <div className='absolute right-0'>
                <CrossPattern w={'100px'} outline={'blue'} fill={'transparent'} />
            </div>
            <div>
                <h2 className={`text-7xl montserrat-alternates-medium ${textColor}`}>{translation[lang].blogs}</h2>
            </div>
            <div className='grid grid-cols-6'>
                <div className='pt-12 col-span-3 flex flex-col '>
                    <div className='pt-12 pb-4'>
                        <Link to={'/blogpage'} className={`py-2 px-8 bg-blue-700 hover:bg-blue-500 rounded-full ${textColor}`}>{translation[lang].blogbtn}</Link>
                    </div>

                    {
                        posts.slice(0, 2).map(ele => {
                            return (
                                <div key={ele?.title} className='py-2'>
                                    <BlogCard post={ele} />
                                </div>
                            )
                        })
                    }

                </div>
                <div className='pt-12 col-span-3 flex flex-col '>

                    {
                        posts.slice(2, 4).map(ele => {
                            return (
                                <div key={ele?.title} className='py-2'>
                                    <BlogCard post={ele} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className='flex justify-end'>
                <CrossPattern w={'50px'} outline={'white'} fill={'white'} />
            </div>
        </div>
    )
}

export default Blogs