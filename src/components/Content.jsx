import React,{useContext} from 'react'
import { Routes,Route } from 'react-router'
import {  ProjectsContext  } from "../context/ProjectsContext.jsx"
import slugify from '../utils/slugify'
import ActiveProjects from './ActiveProjects.jsx'

const Content = () => {
  const {projects}=useContext(ProjectsContext)
  return (
    <Routes>
        <Route path='/' element={<div>My Projects</div>}/>
        {projects.map((project) => (
        <Route
            key={project.id}
            path={`/${slugify(project.name)}-${project.id}`}
            element={<div>{project.name} - {project.id}</div>}
        />
        ))}
        <Route path ="/projects/active" element={<ActiveProjects/>} />
   </Routes>
  )
}

export default Content