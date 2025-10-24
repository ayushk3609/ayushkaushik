import React from 'react'
import LeftArrow from '../Assets/Arrow-left.svg'
import Meter from './Meter'
import StarPattern from './Pattern/StarPattern'
import DotPattern from './Pattern/DotPattern'
import { useTheme } from '../Contexts/theme'
import JS from '../Assets/JS.png'
import CSS from '../Assets/CSS.png'
import Rct from '../Assets/React.png'
import Java from '../Assets/Java.png'
import Node from '../Assets/NodeJs.png'
import tailwind from '../Assets/Tailwind.png'
import mongo from '../Assets/mongo.png'
import redux from '../Assets/Redux.png'
import nextjs from '../Assets/Nextjs.png'
import typescript from '../Assets/TypeScript.png'
import translation, { useTranslation } from '../Contexts/language'

const Skills = () => {
    const {theme} = useTheme()
    const {lang} = useTranslation()
    const textColor = (theme==='dark')?'text-white':'text-black'
    const skillset = [
        {
            "skill": 'CSS',
            "rating": 8,
            "img":CSS
        },
        {
            "skill":'Javascript',
            "rating": 9,
            "img":JS
        },
        {
            "skill":"React",
            "rating": 8,
            "img":Rct
        },
        {
            "skill":'Java',
            "rating": 7,
            "img":Java
        },
        {
            "skill":'Typescript',
            "rating": 6,
            "img":typescript
        },
        {
            "skill":'NodeJs',
            "rating": 4,
            "img":Node
        },
        {
            "skill":'Tailwind',
            "rating": 7,
            "img":tailwind
        },
        {
            "skill":'MongoDb',
            "rating": 5,
            "img":mongo
        },
        {
            "skill":'Redux',
            "rating": 8,
            "img":redux
        },
        {
            "skill":'Nextjs',
            "rating": 7,
            "img":nextjs
        }
    ]
    return (
        <div className='skills pt-16'>
            <div className='pb-16 w-4/5 px-4 md:px-16 m-auto'>
                <div className='flex flex-col md:flex-row'>
                    <h2 className={`pt-8 text-4xl md:text-7xl montserrat-alternates-medium ${textColor}`}>{translation[lang].skill}</h2>
                    <div className='pl-0 md:pl-16 hidden md:block'>
                        <img src={LeftArrow} alt="" />
                    </div>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-4/5 text-lg md:text-xl pt-8 montserrat-alternates-medium ${textColor}`}>
                    <ul>
                        {skillset.slice(0, 5).map((ele) => {
                            return (
                                <li key={ele.skill}>
                                    <div className='py-2.5'>
                                        <div className='flex items-center'>
                                            <img className='w-[40px] h-[40px] md:w-[50px] md:h-[50px]' src={ele.img} alt={ele.skill} />
                                            <h2 className='px-4 text-sm md:text-base'>{ele.skill}</h2>
                                        </div>
                                        <div className='py-2'>
                                            <Meter fillTo={ele.rating} />
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <ul>
                        {skillset.slice(5, 10).map((ele) => {
                            return (
                                <li key={ele.skill}>
                                    <div className='py-2.5'>
                                        <div className='flex items-center'>
                                            <img className='w-[40px] h-[40px] md:w-[50px] md:h-[50px]' src={ele.img} alt={ele.skill} />
                                            <h2 className='px-4 text-sm md:text-base'>{ele.skill}</h2>
                                        </div>
                                        <div className='py-2'>
                                            <Meter fillTo={ele.rating} />
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='w-[250px] pt-16 absolute right-0 hidden md:block'>
                        <StarPattern />
                    </div>
                </div>
            </div>
            <div className='absolute flex'>
                <DotPattern color={'#289abd'}/>
                <DotPattern color={'#289abd'}/>
                <DotPattern color={'#289abd'}/>
            </div>
        </div>
    )
}

export default Skills