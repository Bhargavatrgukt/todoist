import React, { useState, useContext } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import { Button, Modal, Select } from 'antd';
import api from '../services/todoApi';
import { addTask } from '../features/tasksSlice';
import { useSelector,useDispatch } from 'react-redux';

const TaskModel = ({ taskModalOpen, setTaskModalOpen }) => {
  // const { projects, addTask } = useContext(ProjectsContext);
  const projects=useSelector((state)=>state.projects.projects)
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setAddTaskDescription] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id);

  const dispatch=useDispatch()

  const optionsValues = projects.map((project) => ({
    value: project.id,
    label: project.name,
    style: { padding: "10px" }
  }));

  const handleAddTask = async () => {
    try {
      const task = await api.addTask({ content: taskName, description: taskDescription, project_id: projectId });
      dispatch(addTask(task));
    } catch (error) {
      console.error("Error adding task:", error.response ? error.response.data : error);
    }
  };

  const handleSave = () => {
    handleAddTask();
    setTaskModalOpen(false);
  };

  const handleCancel = () => {
    setTaskModalOpen(false);
  };

  return (
    <>
      <Modal
        open={taskModalOpen}
        closable={false}
        footer={null} 
      >
        <div>
          <input
            type='text'
            className='w-full outline-none text-base font-semibold'
            placeholder='Task Name'
            style={{ margin: 0, border: 'none', outline: 'none', padding: '5px' }} 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type='text'
            className='w-full outline-none pt-1 mt-2'
            placeholder='Description'
            style={{ margin: 0, border: 'none', outline: 'none', padding: '5px' }}
            value={taskDescription}
            onChange={(e) => setAddTaskDescription(e.target.value)}
          />
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
                <Button type='default'   style={{ marginRight: "12px" }} onClick={handleCancel}>Cancel</Button>
                <Button type='primary' danger  disabled={taskName.length === 0}   onClick={handleSave}>
                    Add Task
                </Button>
            </div>
              </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskModel;
