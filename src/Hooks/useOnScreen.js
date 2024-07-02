import { useEffect, useState } from "react";

const useOnScreen = (ref,rootMargin='0px') => {
    const [isIntersecting,setIsIntersecting] = useState(false)

    useEffect(() => {
        //IntersectionObserver has a callback fn which accepts array of [entries] since here we only have to 
        //care about one entry 
        let currentRef = ref.current
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),{rootMargin})

        if(ref.current){
            observer.observe(currentRef)
        }

        return ()=>{
            if(currentRef){
                observer.unobserve(currentRef)
            }
        }
    },[ref,rootMargin])

    return isIntersecting;

}

export default useOnScreen;