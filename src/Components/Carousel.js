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
            live: '',
            desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam cum cupiditate ipsum rerum, aut incidunt debitis pariatur? Cum doloribus pariatur est blanditiis. Mollitia fugiat id eveniet tempora, ea ipsa nisi!Quis quasi necessitatibus magni pariatur nobis consequuntur, cum,,",
            github: '',
            image: ''
        },
        {
            name: "EasyShop",
            live: '',
            desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam cum cupiditate ipsum rerum, aut incidunt debitis pariatur? Cum doloribus pariatur est blanditiis. Mollitia fugiat id eveniet tempora, ea ipsa nisi!Quis quasi necessitatibus magni pariatur nobis consequuntur, cum,,",
            github: '',
            image: ''
        },
        {
            name: "Weather",
            live: '',
            desc:" cupiditate ipsum rerum, aut incidunt debitis pariatur? Cum doloribus pariatur est blanditiis. Mollitia fugiat id eveniet tempora, ea ipsa nisi!Quis quasi necessitatibus magni pariatur nobis consequuntur, cum,,",
            github: '',
            image: ''
        },
        {
            name: "The Vintage Snake",
            live: '',
            desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam cum cupiditate ipsum rerum, aut incidunt debitis pariatur? Cum doloribus pariatur est blanditiis. Mollitia fugiat id eveniet tempora, ea ipsa nisi!Quis quasi necessitatibus magni pariatur nobis consequuntur, cum,,",
            github: '',
            image: ''
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
                            <div class=" overflow-hidden relative">
                                <img className='m-auto' src={slide.image} alt='Project-img' />
                            </div>

                        </div>
                    </div>
                    <div className='col-span-2 p-8'>
                        <div className='w-full'>
                            <h2 className='text-3xl p-4 montserrat-alternates-medium'>{slide.name}</h2>
                            <h4 className='p-2'>{slide.desc}</h4>
                            <div className='flex justify-around p-4 montserrat-alternates-medium'>
                                <button className='py-2 px-4 bg-slate-500 rounded-full'>Go Live</button>
                                <button className='py-2 px-4 bg-slate-500 rounded-full'>Github</button>
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