import { useEffect, useState } from 'react'

export const useScrollScene = () => {
    const [sectionIndex, setSectionIndex] = useState(0)

    useEffect(() => {
        const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'blogs', 'contact']
        const onScroll = () => {
            const vh40 = window.innerHeight * 0.38
            for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTION_IDS[i])
                if (el && el.getBoundingClientRect().top <= vh40) {
                    setSectionIndex(i)
                    return
                }
            }
            setSectionIndex(0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return { sectionIndex }
}
