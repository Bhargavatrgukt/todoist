import React, { useEffect, useState } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript"
import MenuComponent from './MenuComponent';
import ButtonComponent from './ButtonComponent';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [projects,setProjects]=useState([]) 


  useEffect(()=>{
    const api = new TodoistApi("42683b58daa0963b444c80d8d102d9758447821d")
    api.getProjects()
      .then((project) =>{
        setProjects(project)
        console.log(project)
      })
      .catch((error) => console.log(error))
  },[])
   
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  return (
   <nav>
      {!collapsed?<div className='min-h-screen w-80 flex bg-[#fcfaf8] p-4'>
      <MenuComponent projects={projects} collapsed={collapsed}/>
      <ButtonComponent toggleCollapsed={toggleCollapsed}/>
      </div>:<ButtonComponent toggleCollapsed={toggleCollapsed}/>}
   </nav>
  )
}

export default SideBar