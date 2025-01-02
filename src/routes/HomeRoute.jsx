import React from 'react'
import { Link } from 'react-router'


const HomeRoute = () => {
  return (
    <Link to="/projects/active">
       <div>My Projects /</div>
    </Link>
  )
}

export default HomeRoute