import React, { createContext, useState, useEffect } from 'react';
import api from '../services/todoApi';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const token = import.meta.env.VITE_MY_API_KEY;

        if (!token) {
          throw new Error("API Key is missing. Please set VITE_MY_API_KEY in the environment variables.");
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [projectsData, tasksData] = await Promise.all([
          api.getProjects({ headers }),
          api.getTasks({ headers }),
        ]);

        setProjects(projectsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
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

  const addTask=(newTask)=>{
    setTasks((prevTasks)=>[...prevTasks,newTask])
  }

  const deleteTask=(taskId)=>{
    setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== taskId))
  }

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
    });
  };
  

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject,tasks,addTask ,deleteTask,updateTask}}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
