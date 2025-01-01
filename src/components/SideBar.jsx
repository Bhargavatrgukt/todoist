import React, { useEffect, useState } from 'react';
import api from '../services/todoApi';
import MenuComponent from './MenuComponent';
import ButtonComponent from './ButtonComponent';
import ModalComponent from './Modal';
import { ProjectsProvider } from '../context/ProjectsContext';


const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  

   
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };



  
  return (
    <ProjectsProvider>
      <nav>
          {!collapsed?<div className='min-h-screen w-80 flex bg-[#fcfaf8] p-4'>
          <MenuComponent 
               collapsed={collapsed}
               setIsModalOpen={setIsModalOpen}
               isModalOpen={isModalOpen}
               setEditingProject={setEditingProject}
          />
          <ButtonComponent toggleCollapsed={toggleCollapsed}/>
          </div>:<div className='p-4'><ButtonComponent toggleCollapsed={toggleCollapsed}/></div>}
          {isModalOpen&&(
            (
              <ModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
              />
            )
          )}
      </nav>
   </ProjectsProvider>
  )
}

export default SideBar