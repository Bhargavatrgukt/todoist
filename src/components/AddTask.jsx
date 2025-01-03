import React, { useState } from 'react'
import { Select,Button } from "antd";
import { ProjectsContext } from '../context/ProjectsContext';
import { useContext } from 'react';
import api from '../services/todoApi';

const AddTask = ({projectIdOfTask,setIsAddTask,task}) => {
  
   const {projects,addTask,updateTask}=useContext(ProjectsContext)
   const [taskName, setTaskName] = useState(task?task.content:"");
   const [taskDescription,setAddTaskDescription]=useState(task?task.description:"")
   const [projectId,setProjectId]=useState(projectIdOfTask)

   const optionsValues = projects.map((project) => ({
    value: project.id,
    label: project.name,
    style: { padding: "10px" }
  }));
  
  const handleAddTask=async()=>{
    try {
        if(task){
            console.log(task)
            const updatedTask=await api.updateTask(task.id, { content:taskName,description:taskDescription });
            updateTask(updatedTask)
        }else{
        const task = await api.addTask({ content:taskName,description:taskDescription,project_id:projectId});
        addTask(task);
        }
        setIsAddTask(false) 
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error);
    }

  }
  
  return (
    <div className='mt-4 p-4 border rounded-lg border-slate-500'>
        <input type='text' className='w-full  outline-none text-base font-semibold' placeholder='Task Name' value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
        <input type='text' className='w-full  outline-none pt-1 mt-2' placeholder='Description' value={taskDescription} onChange={(e)=>setAddTaskDescription(e.target.value)}/>
        <div className='flex justify-between mt-3'>
        <Select
                showSearch
                placeholder="Select a project"
                optionFilterProp="label"
                defaultValue={projectId}
                onChange={(e)=>setProjectId(e)}
                // onSearch={onSearch}
                options={optionsValues}
                />
        <div className='flex'>
            <Button type='default'   style={{ marginRight: "12px" }} onClick={()=>setIsAddTask(false)}>Cancel</Button>
            <Button type='primary' danger  disabled={taskName.length === 0} onClick={handleAddTask}>
                {task?"Update Task": "Add Task"}
            </Button>
        </div>
    </div>
    </div>
  )
}

export default AddTask