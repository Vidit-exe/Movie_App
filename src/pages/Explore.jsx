import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import urlObj from '../urls/urls';
import Card from '../components/Card'

const Explore = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...res.data.results
        ]
      })
      setTotalPageNo(res.data.total_pages)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
      setPageNo(preve => preve + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])


  return (
    <>
      <div className='pt-16'>
        <div className='container mx-auto px-4'>
          <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore}</h3>
          <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-4'>
            {
              data.map((exploreData, index) => {
                return (
                  <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore