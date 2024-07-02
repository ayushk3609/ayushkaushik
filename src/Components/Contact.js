import React, { useState } from 'react'
import Oscillate from './Pattern/Oscillate'
import DotPattern from './Pattern/DotPattern'
import '../index.css'
import emailjs from '@emailjs/browser'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Arrow from '../Assets/Arrow.svg'
import { useTheme } from '../Contexts/theme'



const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: ''
    })
    const {theme} = useTheme()
    const textColor = (theme==='dark')?'text-white':'text-black'
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const tempelateId = process.env.REACT_APP_EMAILJS_TEMPELATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    const showSuccessToast = () => {
        toast.success("Comment sent successfully!")
    }

    const showErrorToast = () => {
        toast.error("Failed to send Comment! Please try again later.")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(serviceId, tempelateId, e.target, userId)
            .then((result) => {
                console.log(result.text)
                showSuccessToast()

                setFormData({ name: '', email: '', comment: '' })
            }, (error) => {
                console.log(error.text)
                showErrorToast()
            })
    }

    return (
        <div to={'/contact'} className='relative pt-32'>
            <div>
                <ToastContainer
                    position='top-center'
                    transition={Bounce}
                    theme='dark'
                ></ToastContainer>
            </div>
            <div className='w-[500px] absolute left-24 -translate-y-44'>
                <Oscillate />
            </div>
            <div className='absolute right-10'>
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
                <DotPattern color={'white'} />
            </div>
            <div className=' w-4/5 mx-auto'>
                <div className='text-center'>
                    <h2 className={`text-7xl montserrat-alternates-medium ${textColor}`}>Contact Me</h2>
                </div>
                <div className={`pt-4 ${textColor}`}>
                    <form onSubmit={handleSubmit} action="submit">
                        <div className='flex flex-col w-1/2 m-auto px-8 py-2'>
                            <label className='px-4 py-2' htmlFor="name">Full name*</label>
                            <input
                                className='px-4 py-3 rounded-full input'
                                type="text"
                                name='name'
                                id='name'
                                placeholder='Enter your full name...'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col w-1/2 m-auto px-8 py-2'>
                            <label className='px-4 py-2' htmlFor="email">Email*</label>
                            <input
                                className='px-4 py-3 rounded-full input'
                                placeholder='Enter your email...'
                                type='email'
                                name='email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col w-1/2 m-auto px-8 py-2'>
                            <label className='px-4 py-2' htmlFor="comment">Comment*</label>
                            <textarea
                                className='px-4 py-3 rounded-2xl input resize-none'
                                placeholder='Enter your comment...'
                                name="comment"
                                id="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <div className='w-[150px] absolute right-44 -scale-x-50'>
                                <img src={Arrow} alt="" />
                            </div>
                        </div>
                        <div className='text-center py-8'>
                            <button className='px-12 py-3 bg-blue-700 rounded-full' type='submit'>Send</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='absolute z-'>
                <Oscillate />
            </div>
        </div >
    )
}

export default Contact