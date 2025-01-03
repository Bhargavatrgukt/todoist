import { Divider} from "antd";
import {HolderOutlined,EditOutlined,EllipsisOutlined} from "@ant-design/icons";
import { Checkbox } from "antd";
import api from '../services/todoApi';
import { ProjectsContext } from '../context/ProjectsContext';
import { useContext } from 'react';

const TaskComponent = ({task,hoveredKey,setHoveredKey}) => {

  const {deleteTask}=useContext(ProjectsContext)

  const handleChange=async()=>{
    try {
      await api.deleteTask(task.id)
      deleteTask(task.id)
    } catch (error) {
      console.log(`error at deleting task`,error)
    }
  }
  return (
    <li className='flex flex-col' 
      onMouseEnter={() => setHoveredKey(task?.id)}
      onMouseLeave={() => setHoveredKey(null)}
    >
       <div
        className="p-3 bg-transparent rounded-md  flex justify-between items-center w-full hover:bg-gray-100  transition duration-200"
        key={task.id}
        >
          <div className='flex'>
            {(hoveredKey===task?.id )&&
            (<div>
              <HolderOutlined />
            </div> )}
              <div>
                <p className="text-[#202020] font-medium pl-2"><Checkbox onChange={handleChange}>{task.content}</Checkbox></p>
                <p className="text-[#202020] font-medium ml-3">{task.description}</p>
              </div>
          </div>
          {(hoveredKey===task?.id )&&(
          <div className='flex'>
             <div className='p-2'>
               <EditOutlined />
             </div>
             <div className='p-2'>
              <EllipsisOutlined />
             </div>
          </div>)}
        </div>  
        <Divider className="my-2" />
    </li>  
  )
}

export default TaskComponent