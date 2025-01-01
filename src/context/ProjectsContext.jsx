import React, { createContext, useState, useEffect } from 'react';
import api from '../services/todoApi';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const updateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  const deleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
