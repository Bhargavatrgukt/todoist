import React,{useContext} from 'react'
import HomeRoute from './HomeRoute';
import TaskComponent from '../components/TaskComponent';
import { ProjectsContext } from '../context/ProjectsContext';
import { useProjectState } from '../hooks/projectHook';
import {PlusCircleOutlined,PlusOutlined } from "@ant-design/icons";

const ProjectTaskRoute = ({project}) => {
  const{tasks}=useContext(ProjectsContext)
  const {hoveredKey, setHoveredKey}=useProjectState()
  return (
    <>
        <HomeRoute />
        <div className="flex justify-center px-44 py-16">
            <div className="w-[40vw]">
                <h1 className="text-2xl font-bold mb-4 text-left">{project.name}</h1>
                <ul className="list-none space-y-2">
                {tasks
                    .filter((task) => task.projectId === project.id)
                    .map((task) => (
                    <TaskComponent task={task} key={task.id} hoveredKey={hoveredKey} setHoveredKey={setHoveredKey}/>
                    ))}
                </ul>
                <div className='text-gray-600 hover:text-red-500 flex pl-6' onMouseEnter={()=>setHoveredKey("plus")} onMouseLeave={()=>setHoveredKey(null)}>
                    {(hoveredKey==="plus")?
                (<PlusCircleOutlined style={{ color: "#C35646", fontSize: "18px"}} />):(<PlusOutlined />)} 
                  <p className='pl-4'>Add Task</p>
                </div>
            </div>
        </div>

    </>
  )
}

export default ProjectTaskRoute