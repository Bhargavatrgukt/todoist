import React, { createContext, useState } from 'react';

export const ModelContext=createContext()

const ModelProvider = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingProject, setEditingProject] = useState(null);
  return (
   <ModelContext.Provider value={{isModalOpen,setIsModalOpen,editingProject,setEditingProject}}>
     {children}
   </ModelContext.Provider>
  )
}

export default ModelProvider