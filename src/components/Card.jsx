import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({ data, trending, index, media_type }) => {
    const imageUrl = useSelector(state => state.movieoData.imageUrl)

    const mediaType = data.media_type ?? media_type
    return (
        <>
            <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] rounded h-full block overflow-hidden relative hover:scale-105 transition-all'>
                {
                    data?.poster_path ? (
                        <img src={imageUrl + data?.poster_path} alt="" />
                    ) : (
                        <div className='flex items-center justify-center h-full w-full bg-neutral-800'>
                            No image available!
                        </div>
                    )
                }
                <div className='absolute top-4'>
                    {
                        trending && (
                            <div className='py-1 px-4 bg-black/60 overflow-hidden backdrop-blur-3xl rounded-r-full'>
                                #{index} Trending
                            </div>
                        )
                    }
                </div>
                <div className='absolute bottom-0 h-20 backdrop-blur-3xl w-full bg-black/60 p-1 px-3 flex flex-col justify-center'>
                    <h2 className='text-ellipsis line-clamp-1 font-semibold'>{data.title || data.name}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{moment(data.release_date || data.first_air_date).format('LL')}</p>
                        <p className='text-xs'>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card