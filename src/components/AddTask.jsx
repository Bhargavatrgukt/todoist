import React, { useState } from 'react'
import { Select,Button } from "antd";
import { ProjectsContext } from '../context/ProjectsContext';
import { useContext } from 'react';
import api from '../services/todoApi';

const AddTask = ({project,setIsAddTask,addTask}) => {
   const {projects}=useContext(ProjectsContext)
   const [taskName, setTaskName] = useState("");
   const [taskDescription,setAddTaskDescription]=useState("")
   const [projectId,setProjectId]=useState(project.id)

   const optionsValues = projects.map((project) => ({
    value: project.id,
    label: project.name,
    style: { padding: "10px" }
  }));

  const handleAddTask=async()=>{
    try {
        const task = await api.addTask({ content:taskName,description:taskDescription,project_id:projectId});
        addTask(task);
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
                onChange={(e)=>setProjectId(e.target.value)}
                // onSearch={onSearch}
                options={optionsValues}
                />
        <div className='flex'>
            <Button type='default'   style={{ marginRight: "12px" }} onClick={()=>setIsAddTask(false)}>Cancel</Button>
            <Button type='primary' danger  disabled={taskName.length === 0} onClick={handleAddTask}>Add Task</Button>
        </div>
    </div>
    </div>
  )
}

export default AddTask