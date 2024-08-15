import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageUrl } from './store/movieoSlice'

function App() {
  const dispatch = useDispatch()
  const fetchTrendingData = async() => {
    try {
      const res = await axios.get("/trending/all/week")
      dispatch(setBannerData(res.data.results))
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchConfiguration = async () => {
    try {
        const response = await axios.get("/configuration")
        dispatch(setImageUrl(response.data.images.secure_base_url+"original"))
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchTrendingData()
    fetchConfiguration()
  }, [])
  

  return (
    <>
      <div className='pb-14 lg:pb-0'>
        <Header />
        <div className='min-h-[90vh]'>
          <Outlet />
        </div>
        <Footer />
        <MobileNavigation />
      </div>
    </>
  )
}

export default App
