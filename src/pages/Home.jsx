import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
import urlObj from '../urls/urls'

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData)
  const { data: nowplayingData } = useFetch(urlObj.NowPlayingData)
  const { data : topRatedData} = useFetch(urlObj.TopRatedData)
  const { data : popularTvShows} = useFetch(urlObj.TvTopRated)
  const { data : streamingNowTvShows} = useFetch(urlObj.TvStreamingNow)
  return (
    <>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending Now"} trending={true}/>
      <HorizontalScrollCard data={nowplayingData} heading={"Now Playing Movies"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShows} heading={"Popular TV Shows"} media_type={"tv"}/>
      <HorizontalScrollCard data={streamingNowTvShows} heading={"Tv Shows Streaming Now"} media_type={"tv"}/>
    </>
  )
}

export default Home