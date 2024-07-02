import React from 'react'
import LeftArrow from '../Assets/Arrow-left.svg'
import Meter from './Meter'
import  StarPattern from './Pattern/StarPattern'
import DotPattern from './Pattern/DotPattern'
import { useTheme } from '../Contexts/theme'

const Skills = () => {
    const {theme} = useTheme()
    const textColor = (theme==='dark')?'text-white':'text-black'
    const skillset = [
        {
            "CSS": 8
        },
        {
            "Javascript": 9
        },
        {
            "React": 8
        },
        {
            "Java": 7
        },
        {
            "NodeJs": 4
        },
        {
            "Tailwind": 7
        },
        {
            "MongoDb": 5
        },
        {
            "Redux": 8
        }
    ]
    return (
        <div className='skills pt-16'>
            <div className='pb-16 w-4/5 px-16 m-auto'>
                <div className='flex'>
                    <h2 className={`pt-8 text-7xl montserrat-alternates-medium ${textColor}`}>My skills</h2>
                    <div className='pl-16'>
                        <img src={LeftArrow} alt="" />
                    </div>
                </div>
                <div className={`grid grid-cols-2 gap-4 w-4/5 text-xl pt-8 montserrat-alternates-medium ${textColor}`}>
                    <ul>
                        {skillset.slice(0, 4).map((ele) => {
                            const [key, value] = Object.entries(ele)[0]
                            return (
                                <li key={key}>
                                    <div className='py-2.5'>
                                        <div className=''>
                                            <h3>{key}</h3>
                                        </div>
                                        <div className='py-2'>
                                            <Meter fillTo={value} />
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <ul>
                        {skillset.slice(4, 8).map((ele) => {
                            const [key, value] = Object.entries(ele)[0]
                            return (
                                <li key={key}>
                                    <div className='py-2.5'>
                                        <div>
                                            <h3>{key}</h3>
                                        </div>
                                        <div className='py-2'>
                                            <Meter fillTo={value} />
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='w-[250px] pt-16 absolute right-0'>
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