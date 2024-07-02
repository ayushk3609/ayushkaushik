import React from 'react'
import BlogCard from './BlogCard'
import CrossPattern from './Pattern/CrossPattern'
import { useTheme } from '../Contexts/theme'


const Blogs = () => {

    const {theme} = useTheme()
    const textColor = (theme==='dark')?'text-white':'text-black'
    const posts = [
        {
            title: 'Managing state with useReducer, useState',
            desc: '',
            img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGV8ZW58MHx8MHx8fDA%3D',
            url: ''
        },
        {
            title: 'Handling UX with EJS',
            desc: '',
            img: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1669904581074/eiOU4pInF.png',
            url: ''
        },
        {
            title: 'Top React-18 features',
            desc: '',
            img: 'https://www.clariontech.com/hubfs/React%2018%20New%20Features.jpg',
            url: ''
        },
        {
            title: 'Optimising your react loading',
            desc: '',
            img: 'https://res.cloudinary.com/cloudinary-marketing/images/w_2000,h_1100/f_auto,q_auto/v1649726043/Web_Assets/blog/Lazy-Loading-React_2209601c04/Lazy-Loading-React_2209601c04-png?_i=AA',
            url: ''
        },
    ]
    return (
        <div className='w-4/5 relative m-auto px-16 pt-32'>
            <div className='absolute right-0'>
                <CrossPattern w={'100px'} outline={'blue'} fill={'transparent'} />
            </div>
            <div>
                <h2 className={`text-7xl montserrat-alternates-medium ${textColor}`}>My Blog</h2>
            </div>
            <div className='grid grid-cols-6'>
                <div className='pt-12 col-span-3 flex flex-col '>
                    <div className='pt-12 pb-4'>
                        <button className={`py-2 px-8 bg-blue-600 rounded-full ${textColor}`}>See all</button>
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