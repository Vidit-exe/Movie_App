import { IoHome } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon: <PiTelevision />
    },
    {
        label: "Movies",
        href: "movie",
        icon: <BiSolidMoviePlay />
    }
]

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <IoHome />
    },
    {
        label: "Search",
        href: "/search",
        icon: <IoSearchOutline/>
    },
    ...navigation
]