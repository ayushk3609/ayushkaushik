import React, { useState,useEffect, useRef} from 'react'
import '../index.css'
import useOnScreen from '../Hooks/useOnScreen'

const Meter = ({fillTo}) => {
    const arr = new Array(10).fill(0)
    const [filled,setFilled] = useState(0)
    const ref = useRef()
    const visible = useOnScreen(ref)
    useEffect(()=>{
      if(visible){
        let count = 0;
        const timer = setInterval(() => {
          count++;
          setFilled(count)
          if(count === fillTo) clearInterval(timer);
        },300)
      }
      
    },[visible,fillTo])
  
  return (
    <div ref={ref} className='flex'>
        {
            arr.map((ele,index) => <div key={index} 
            className={`w-[12px] h-[12px] mx-2 rounded-full meter ${index < filled ? 'filled':''}`}>

            </div>)
        }
    </div>
  )
}

export default Meter