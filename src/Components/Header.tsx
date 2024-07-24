import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
    const currentRoute = useLocation()
    const [page, setPage] = useState('');

    //seting state for current route
    useEffect(() => {
        setPage(currentRoute.pathname || "");
    }, [currentRoute.pathname])

    return (

        <div className="header">
            <a href="#default" className="logo">My Art Gallery</a>
            <div className="header-right">
                <Link to='/' className={`${page === "/" ? "active" : ""}`}>Home</Link>
                <Link to='/contact' className={`${page === "/contact" ? "active" : ""}`}>Comments</Link>
            </div>
        </div>
    )
}

export default Header