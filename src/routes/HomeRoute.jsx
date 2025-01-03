import React from 'react'
import { Link } from 'react-router'


const HomeRoute = () => {
  return (
    <Link to="/projects/active">
       <span className='hover:bg-gray-100  transition duration-200 text-slate-700'>My Projects /</span>
    </Link>
  )
}

export default HomeRoute