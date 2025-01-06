import React, { createContext, useState,useReducer, useEffect } from 'react';
import api from '../services/todoApi';


const initialState={
  projects:[],
  tasks:[]
}


const reducer=(state,action)=>{
  switch(action.type){
    case 'SET_PROJECTS':
      return {...state,projects:action.payload.projects}
    case 'SET_TASKS':
      return {...state,tasks:action.payload.tasks}  
    case "ADD_PROJECT":
      return {...state,projects:[...state.projects,action.payload.project]} 
    case "ADD_TASK":
      return {...state,tasks:[...state.tasks,action.payload.task]}
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects:state.projects.map(project=>{
          project.id === action.payload.project.id
            ? action.payload.project
            : project
        })
      }
    case "UPDATE_TASK":
        return {
          ...state,
          tasks:state.tasks.map(task=>{
            task.id === action.payload.task.id
              ? action.payload.task
              : task
          })
        }  

    case "DELETE_PROJECT":
        return{
          ...state,
          projects:state.projects.filter(project=>project.id!=action.payload.projectId)
        }

    case "DELETE_TASK":
      return{
        ...state,
        tasks:state.tasks.filter(task=>task.id!=action.payload.taskId)
      }    
    
    default:
      return state  


  }
}

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  // const [projects, setProjects] = useState([]);
  //  const [tasks, setTasks] = useState([]);

  const [state,dispatch]=useReducer(reducer,initialState)

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([api.getProjects(), api.getTasks()]);
        dispatch({type:'SET_PROJECTS',payload:{projects:projectsData}})
        dispatch({type:'SET_TASKS',payload:{tasks:tasksData}})  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  

  const addProject = (newProject) => {
    // setProjects((prevProjects) => [...prevProjects, newProject]);
    dispatch({type:"ADD_PROJECT",payload:{project:newProject}})
  };

  const updateProject = (updatedProject) => {
   dispatch({type:"UPDATE_PROJECT",payload:{project:updatedProject}})
  }

  const deleteProject = (projectId) => {
   dispatch({type:"DELETE_PROJECT",payload:{projectId}})
  };

  const addTask=(newTask)=>{
    // setTasks((prevTasks)=>[...prevTasks,newTask])
    dispatch({type:"ADD_TASK",payload:{task:newTask}})
  }

  const deleteTask=(taskId)=>{
    // setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== taskId))
    dispatch({type:"DELETE_TASK",payload:{taskId}})
  }

  const updateTask = (updatedTask) => {
   dispatch({type:"UPDATE_TASK",payload:{task:updateTask}})
  };
  

  return (
    <ProjectsContext.Provider
      value={{ projects:state.projects, addProject, updateProject, deleteProject,tasks:state.tasks,addTask ,deleteTask,updateTask}}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
