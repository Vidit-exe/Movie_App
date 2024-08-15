import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";


const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData)
    const imageUrl = useSelector(state => state.movieoData.imageUrl)
    const [currentImage, setCurrentImage] = useState(0)
    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        if (currentImage < bannerData.length - 1) {
            handleNext()
        } else {
            setCurrentImage(0)
        }
      }, 3000);
      return () => clearInterval(interval)
    }, [bannerData, imageUrl, currentImage])
    

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {

                        return (
                            <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <div className='w-full h-full'>
                                    <img src={imageUrl + data.backdrop_path} className='h-full object-cover w-full' alt="" />
                                </div>
                                {/*Buttons for the next and previous*/}
                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                    <FaAngleLeft />
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                    <FaAngleRight />
                                    </button>
                                </div>
                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                                <div className='container mx-auto'>
                                    <div className='w-full absolute bottom-0 max-w-md px-4'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data.title || data.name}</h2>
                                        <p className='my-3 text-ellipsis line-clamp-3'>{data.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>Popularity: {Number(data.popularity).toFixed(0)}+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome