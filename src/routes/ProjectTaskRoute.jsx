import React,{useState,useEffect} from 'react'
import api from '../services/todoApi'
import HomeRoute from './HomeRoute';

const ProjectTaskRoute = ({project}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api
          .getTasks()
          .then((data) => setTasks(data))
          .catch((error) => console.error(error));
      }, []);
    console.log(tasks)
  return (
    <>
        <HomeRoute />
        <div className='flex justify-center'>
            <h1>{project.name}</h1>
            <ul>
                {
                    tasks.filter(task=>task.projectId===project.id).map(task=>(
                        <li key={task.id}>{task.content}</li>
                    ))
                }
            </ul>
        </div>
    </>
  )
}

export default ProjectTaskRoute