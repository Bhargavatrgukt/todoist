import React from 'react'
import { Divider} from "antd";
import {HolderOutlined,EditOutlined,EllipsisOutlined} from "@ant-design/icons";
import { Checkbox } from "antd";

const TaskComponent = ({task,hoveredKey,setHoveredKey}) => {
  return (
    <div className='flex flex-col' 
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
            <li className="text-[#202020] font-medium pl-2"><Checkbox>{task.content}</Checkbox></li>
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
    </div>  
  )
}

export default TaskComponent