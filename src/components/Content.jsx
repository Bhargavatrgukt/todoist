import React,{useContext} from 'react'
import { Routes,Route } from 'react-router'
import {  ProjectsContext  } from "../context/ProjectsContext.jsx"
import slugify from '../utils/slugify'
import ActiveProjects from './ActiveProjects.jsx'
import HomeRoute from '../routes/HomeRoute.jsx'
import ProjectTaskRoute from '../routes/ProjectTaskRoute.jsx'

const Content = () => {
  const {projects}=useContext(ProjectsContext)
  return (
    <Routes>
        <Route path='/' element={<HomeRoute />}/>
        {projects.map((project) => (
        <Route
            key={`${project.id}-${project.name}`}
            path={`/${slugify(project.name)}-${project.id}`}
            element={<ProjectTaskRoute project={project}/>}
        />
        ))}
        <Route path ="/projects/active" element={<ActiveProjects />} />
   </Routes>
  )
}

export default Content