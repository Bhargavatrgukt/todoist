import React,{useContext} from 'react'
import { Routes,Route } from 'react-router'
// import {  ProjectsContext  } from "../context/ProjectsContext.jsx"
import slugify from '../utils/slugify'
import HomeRoute from '../routes/HomeRoute.jsx'
import ActiveProjects from './ActiveProjects.jsx'
import ProjectTaskRoute from '../routes/ProjectTaskRoute.jsx'
import { useSelector } from 'react-redux'

const Content = () => {
  // const {projects}=useContext(ProjectsContext)
  const projects=useSelector((state)=>state.projects.projects)
  return (
    <Routes>
        <Route path='/' element={<HomeRoute />}/>
        {projects.map((project) => (
        <Route
            key={project.id}
            path={`/${slugify(project.name)}-${project.id}`}
            element={<ProjectTaskRoute project={project}/>}
        />
        ))}
        <Route path ="/projects/active" element={<ActiveProjects />} />
   </Routes>
  )
}

export default Content