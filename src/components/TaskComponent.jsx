import { Divider} from "antd";
import {HolderOutlined,EditOutlined,EllipsisOutlined,DeleteOutlined} from "@ant-design/icons";
import { Checkbox,Dropdown } from "antd";
import api from '../services/todoApi';
import { ProjectsContext } from '../context/ProjectsContext';
import { useContext,useState } from 'react';
import AddTask from "./AddTask";

const TaskComponent = ({task,hoveredKey,setHoveredKey}) => {
  
  const [isUpdateTask, setUpdateTask] = useState(false);
  const {deleteTask}=useContext(ProjectsContext)

  const handleChange=async()=>{
    try {
      await api.deleteTask(task.id)
      deleteTask(task.id)
    } catch (error) {
      console.log(`error at deleting task`,error)
    }
  }

  const renderMenuItem = (icon, label, onClick) => (
    <div className="flex gap-5" onClick={onClick}>
      {icon}
      <p>{label}</p>
    </div>
  );

  const handleEdit=()=>{
    setUpdateTask(true)
  }

 const items= [
    {
      key: "1",
      label: renderMenuItem(<EditOutlined />, "Edit", handleEdit),
    },
    {
      key: "2",
      label: renderMenuItem(
        <DeleteOutlined />,
        "Delete",
        handleChange
      ),
    },
  ]

  return (
    <>
      {!isUpdateTask &&<li className='flex flex-col group' 
        onMouseEnter={() => setHoveredKey(task?.id)}
        onMouseLeave={() => setHoveredKey(null)}
      >
          <div
          className="p-3 bg-transparent rounded-md  flex justify-between items-center w-full"
          key={task.id}
          >
            <div className='flex'>
              <div className="hidden group-hover:block ">
                <HolderOutlined />
              </div> 
                <div className="flex flex-col items-center px-3">
                  <p className="text-[#202020]  pl-2 font-medium"><Checkbox onChange={handleChange}>{task.content}</Checkbox></p>
                  <p className="text-gray-500 ml-3 font-light">{task.description}</p>
                </div>
            </div>
            <div className='flex'>
              <div className='p-2 cursor-pointer hidden group-hover:block' onClick={handleEdit}>
                <EditOutlined />
              </div>
              <div className='p-2 cursor-pointer hidden group-hover:block'>
                <Dropdown
                  trigger={["click"]}
                  menu={{items}}
                  placement="rightTop"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisOutlined />
                </Dropdown>  
              </div>
            </div>
          </div>  
          <Divider className="my-2" />
      </li>}
      {isUpdateTask && <AddTask projectIdOfTask={task.projectId} setIsAddTask={setUpdateTask} task={task}  />}  
   </> 
  )
}

export default TaskComponent