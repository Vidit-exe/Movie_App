import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../constants/navigation';

const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchInput, setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()
    

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput])

    let handleSubmit = (e) => {
        e.preventDefault()
    }
    
  return (
    <>
        <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40'>
            <div className="container mx-auto px-4 flex items-center h-full">
                <Link to="/">
                    <img src={logo} alt="" width={120} />
                </Link>
                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                {
                    navigation.map((nav, index) => {
                        return (
                            <div>
                                <NavLink key={nav.label} to={nav.href} className={({isActive})=>`text-white px-3 hover:text-neutral-500 ${isActive && "text-neutral-500"}`}>
                                    {nav.label}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </nav>
            <div className='ml-auto flex items-center gap-5'>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Search Here'
                        className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                    <button className='text-2xl text-white bg-transparent hover:outline-none hover:border-none hover:text-neutral-500 border-none outline-none'>
                        <IoSearchOutline />
                    </button>
                </form>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img src={user} alt="" width="w-full h-full" className='cursor-pointer active:scale-50 transition-all' />
            </div>
            </div>
            </div>
        </header>
    </>
  )
}

export default Header