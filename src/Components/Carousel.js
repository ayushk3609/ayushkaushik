import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
const Carousel = () => {
    const slides = [
        {
            name: "NetflixGPT",
            live: 'https://netflixgpt-817c9.web.app/browse',
            desc: "An innovative project using React.js that mimics the sleek UI of Netflix and integrates the Gemini AI model for customizable movie recommendations. This application provides users with a personalized movie discovery experience, allowing them to receive tailored suggestions based on their preferences. With secure login authentication and signup features, users can create accounts and enjoy a seamless, intuitive interface that enhances their movie-watching journey.",
            github: 'https://github.com/ayushk3609/NetflixGPT',
            image: 'https://res.cloudinary.com/heaven3609/image/upload/v1715455196/NetflixGPT_pbf9q9.png'
        },
        {
            name: "EasyShop",
            live: 'https://easyshop-04k3.onrender.com/products',
            desc: "A comprehensive e-commerce website using EJS, Node.js, and Express.js, designed to cater to both retailers and customers with distinct roles and functionalities. Retailers can perform CRUD operations, allowing them to manage their products efficiently, while customers can securely browse, view, and purchase products. The platform includes robust authentication and signup processes to ensure a secure and seamless user experience, providing a dynamic and user-friendly interface for all users.",
            github: 'https://github.com/ayushk3609/EasyShop',
            image: 'https://res.cloudinary.com/heaven3609/image/upload/v1720375637/Untitled_design_zbjdop.png'
        },
        {
            name: "The Weather App",
            live: 'https://theweatherapp01.netlify.app/',
            desc:  "A captivating weather application using Vanilla JavaScript that fetches and displays current weather details with a mesmerizing UI. This project offers users an intuitive and visually appealing experience, providing real-time weather updates for any location. The sleek design, combined with seamless functionality, ensures that users can easily access accurate weather information, making it a delightful and practical tool for everyday use.",
            github: 'https://github.com/ayushk3609/Weather-app',
            image: 'https://res.cloudinary.com/heaven3609/image/upload/v1720530760/Screenshot_2024-07-09_184219_tzvgh6.png'
        },
        {
            name: "Classic Snake game",
            live: 'https://sensational-crostata-5c9469.netlify.app/',
            desc: "A classic Snake game using Vanilla JavaScript and HTML5 Canvas, featuring multiple difficulty modes.",
            github: 'https://github.com/ayushk3609/Snake-Game',
            image: 'https://www.classicgame.com/uploaded/game/screenshot/classic-snake800.webp'
        }
    ]

    const params = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: FontFaceSetLoadEvent,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
        },
        modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true
        }
    }


    const renderSlide = () => {
        return slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <div className='carousel-item w-[70%] h-[500px] m-auto grid grid-cols-4 gap-2 '>

                    <div className='col-span-2'>
                        <div className='w-full'>
                            <div class=" overflow-hidden p-2 relative">
                                <img className='m-auto h-[450px]' src={slide.image} alt='Project-img' />
                            </div>

                        </div>
                    </div>
                    <div className='col-span-2 p-2'>
                        <div className='w-full'>
                            <h2 className='text-3xl p-4 montserrat-alternates-medium'>{slide.name}</h2>
                            <h4 className='p-2'>{slide.desc}</h4>
                            <div className='flex justify-around p-4 montserrat-alternates-medium'>
                                <a href={slide.live} className='py-2 px-4 bg-slate-500 rounded-full hover:bg-slate-700'>Go Live</a>
                                <a href={slide.github} className='py-2 px-4 bg-slate-500 rounded-full hover:bg-slate-700'>Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ))
    }

    return (
        <div className='relative p-8 flex overflow-hidden items-center'>
            <Swiper {...params}  className='swiper_container'
            >
                {renderSlide()}
                <div className="slider_controller">
                    <div className="swiper-button-prev ">
                    </div>
                    <div className="swiper-button-next ">
                    </div>
                    <div className="swiper-pagination ">

                    </div>
                </div>
            </Swiper>

        </div>
    )
}

export default Carousel