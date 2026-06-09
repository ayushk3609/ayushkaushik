import React from 'react'
import { motion } from 'framer-motion'
import JS from '../Assets/JS.png'
import CSS from '../Assets/CSS.png'
import Rct from '../Assets/React.png'
import Node from '../Assets/NodeJs.png'
import tailwind from '../Assets/Tailwind.png'
import mongo from '../Assets/mongo.png'
import redux from '../Assets/Redux.png'
import nextjs from '../Assets/Nextjs.png'
import typescript from '../Assets/TypeScript.png'
import translation, { useTranslation } from '../Contexts/language'
import '../index.css'

const skillset = [
    { skill: 'React.js',    rating: 10, img: Rct,       level: 'Expert'       },
    { skill: 'TypeScript',  rating: 9,  img: typescript, level: 'Expert'       },
    { skill: 'JavaScript',  rating: 9,  img: JS,         level: 'Expert'       },
    { skill: 'CSS / HTML5', rating: 8,  img: CSS,        level: 'Advanced'     },
    { skill: 'Tailwind',    rating: 8,  img: tailwind,   level: 'Advanced'     },
    { skill: 'Redux',       rating: 8,  img: redux,      level: 'Advanced'     },
    { skill: 'Node / NestJS', rating: 7, img: Node,      level: 'Advanced'     },
    { skill: 'Next.js',     rating: 7,  img: nextjs,     level: 'Advanced'     },
    { skill: 'MongoDB',     rating: 6,  img: mongo,      level: 'Proficient'   },
]

const levelColors = {
    Expert:      'rgba(16,185,129,0.75)',
    Advanced:    'rgba(124,58,237,0.75)',
    Proficient:  'rgba(6,182,212,0.75)',
    Intermediate:'rgba(245,158,11,0.75)',
    Learning:    'rgba(100,116,139,0.75)',
}

const Skills = () => {
    const { lang } = useTranslation()

    return (
        <section className='py-24 relative'>
            <div className='orb w-[500px] h-[300px] top-1/2 right-0 -translate-y-1/2' style={{ background: 'rgba(6,182,212,0.05)' }}></div>

            <div className='max-w-6xl mx-auto px-6'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-14'
                >
                    <span className='section-label'>What I Know</span>
                    <h2 className='font-display font-bold mt-2' style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)' }}>
                        {translation[lang].skill}
                    </h2>
                </motion.div>

                {/* Skills Grid — 3 cols mobile, up to 5 desktop */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                    {skillset.map((skill, i) => (
                        <motion.div
                            key={skill.skill}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className='glass-card rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default'
                        >
                            <img src={skill.img} alt={skill.skill} className='w-11 h-11 object-contain' />

                            <span className='font-medium text-sm text-center leading-tight' style={{ color: 'var(--text)' }}>
                                {skill.skill}
                            </span>

                            {/* Progress bar */}
                            <div className='skill-bar-track w-full'>
                                <motion.div
                                    className='skill-bar-fill'
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.rating * 10}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: i * 0.06, ease: 'easeOut' }}
                                />
                            </div>

                            <span className='text-xs font-semibold px-2 py-0.5 rounded-full' style={{
                                color: levelColors[skill.level],
                                background: levelColors[skill.level].replace('0.75', '0.12'),
                            }}>
                                {skill.level}
                            </span>
                        </motion.div>
                    ))}

                    {/* Extra tools card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillset.length * 0.06, duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className='glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-default text-center'
                    >
                        <span className='text-2xl'>🛠</span>
                        <span className='font-medium text-sm leading-tight' style={{ color: 'var(--text)' }}>
                            Azure · Docker · Jest · Cypress
                        </span>
                        <span className='text-xs font-semibold px-2 py-0.5 rounded-full'
                            style={{ color: 'rgba(6,182,212,0.75)', background: 'rgba(6,182,212,0.12)' }}>
                            DevOps / Testing
                        </span>
                    </motion.div>
                </div>

                {/* Tech category pills */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='flex flex-wrap justify-center gap-2 mt-10'
                >
                    {[
                        'React Native', 'Expo', 'NestJS', 'Express.js', 'REST APIs',
                        'MS SQL Server', 'TypeORM', 'Azure DevOps', 'Turborepo',
                        'GitHub Actions', 'ESLint', 'Prettier', 'Agile/Scrum'
                    ].map(tech => (
                        <span key={tech} className='tag-pill'>{tech}</span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
