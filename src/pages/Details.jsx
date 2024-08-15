import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';

const Details = () => {
  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data : similarData } = useFetchDetails(`/${params?.explore}/${params?.id}/similar`)
  const { data : recommendedData } = useFetchDetails(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }
  
  const imageUrl = useSelector(state => state.movieoData.imageUrl)
  const crew = {
    director: castData?.crew?.filter(el => el?.job === "Director")?.map(el => el?.name).join(", ") ,
    producer: castData?.crew?.filter(el => el?.job === "Producer")?.map(el => el?.name).join(", "),
    writer: castData?.crew?.filter(el => el?.job === ("Screenplay" || "Writer") || (el.known_for_department === "Writing" || el.known_for_department === "Production"))?.map(el => el?.name).join(", ")
  }

  const duration = ((data?.runtime)/60).toFixed(1).split(".")

  return (
    <>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageUrl + data?.backdrop_path}
            alt=""
            className='h-full object-cover w-full'
          />
          <div className='absolute bg-gradient-to-t from-neutral-900/90 to-transparent w-full h-full top-0'></div>
        </div>
      </div>
      <div className='container mx-auto px-4 py-16 lg:py-1 flex flex-col lg:flex-row gap-5 lg:gap-5'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 h-fit min-w-60'>
        <img
            src={imageUrl + data?.poster_path}
            alt=""
            className='h-full object-cover w-60 rounded'
          />
        </div>
        <div className='w-full'>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data.title || data.name}</h2>
          <p className='text-neutral-400 my-3'>{data.tagline}</p>
          <Divider/>
          <div className='flex items-center my-1 gap-3'>
            <p>
              Rating : {Number(data.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              Views : {Number(data.vote_count).toFixed(0)}+
            </p>
            <span>|</span>
            <p>
              {
                params.explore === "tv" ? (
                  <div>Episode Run Time: {data?.episode_run_time} m</div>
                ) : (
                  <div>
                    Duration : {duration[0]}h {duration[1]}m

                  </div>
                )
              }
            </p>
          </div>
          <Divider/>
          <div>
            <p>
              Release Date/First Air Date: {moment(data.release_date || data.first_air_date).format('LL')}
            </p>
          </div>
          <Divider/>
          <div className='mt-3'>
            <h3 className='text-xl font-bold'>Sypnosis</h3>
            <p className='mt-1'>{data.overview}</p>
          </div>
          <Divider/>
          <div>
            <p>
              Director: {crew.director}
            </p>
            <Divider/>
            <p>
              Producer: {crew.producer}
            </p>
            <Divider/>
            <p className='line-clamp-1'>
              Writer: {crew.writer}
            </p>
            <Divider/>
          </div>
          <div>
            <h2 className='font-bold'>Cast: </h2>
            <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-3 my-3 items-center justify-items-center lg:justify-start'>
              {
                castData?.cast?.filter(el => el?.profile_path)?.map((cast, index) => {
                  return (
                    <div className='flex flex-col text-center'>
                      <div>
                        <img 
                          src={imageUrl+cast?.profile_path}
                          alt="No Picture Found"
                          className='w-24 h-24 object-cover rounded-full'
                        />
                      </div>
                      <p className='text-center text-sm font-bold text-neutral-400 my-3'>
                        {cast?.name}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard data={similarData?.results} heading={"Similar "+params.explore} media_type={params?.explore}/>
        <HorizontalScrollCard data={recommendedData?.results} heading={"Recommended "+params.explore} media_type={params?.explore}/>
      </div>
    </>
  )
}

export default Details