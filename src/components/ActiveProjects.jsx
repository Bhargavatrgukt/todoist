import { useContext,useState } from 'react'
// import { ProjectsContext } from '../context/ProjectsContext'
import { Input } from "antd";
import { SearchOutlined,PlusOutlined } from "@ant-design/icons";
import { ModelContext } from '../context/ModelContext';
import { Space ,Divider} from "antd";
import {  Tooltip} from "antd";
import { useProjectState } from '../hooks/projectHook';
import generateProjectItems from "../utils/generateProjectsItems"
import DeleteConfirmModel from './DeleteConfirmModel';
import { useSelector } from 'react-redux';
import { updateProject } from '../features/projectsSlice';


const ActiveProjects = () => {
 const [projectName,searchProject]=useState("");   
//  const {projects,updateProject }=useContext(ProjectsContext)
  const projects=useSelector((state)=>state.projects.projects);
  const projectStatus=useSelector((state)=>state.projects.status);

 const {setIsModalOpen, setEditingProject}=useContext(ModelContext)

   const {
      hoveredKey,
     setHoveredKey,
     selectedProjectId,
     setSelectedProjectId,
     setDeleteModal,
     setProjectToDelete,
     openDeleteModal,
     projectToDelete
   } = useProjectState();

//    console.log(openDeleteModal)
   const filteredProjects=projects.slice(1,).filter((project)=>project.name.toLowerCase().includes(projectName.toLocaleLowerCase()))
   const formattedProjects = generateProjectItems(filteredProjects, "user", hoveredKey,
   setHoveredKey,
   selectedProjectId,
   setSelectedProjectId,
   setDeleteModal,
   setProjectToDelete,
   setEditingProject,
   setIsModalOpen,
   updateProject,false);
  return (
    <>
      {projectStatus ==="loading" && <p>Loading</p>}
      {!projectStatus ==="loading" && <> 
      {openDeleteModal && (
        <DeleteConfirmModel open={openDeleteModal} setOpen={setDeleteModal} project={projectToDelete} />
      )}
        <div className='flex justify-center px-44 py-16'>
            <div className='w-[40vw]'>
                <h1 className="text-2xl font-bold mb-4 text-left">My Projects</h1>
                <Input
                placeholder="Search"
                type="search"
                prefix={<SearchOutlined />}
                style={{padding:"10px"}}
                onChange={(event)=>searchProject(event.target.value)}
                />
            <div className='flex justify-end'>
                <Tooltip title="My Projects Menu">
                    <PlusOutlined
                    style={{ padding: "10px" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                        setEditingProject(null);
                    }}
                    />
                </Tooltip>
            </div>
            <Space />
            <p className='text-[#202020] text-base'>{filteredProjects.length} projects</p>
            <Divider />
            <ul className="list-none space-y-2">
                {formattedProjects.map((project) => (
                    <div
                    className="p-4 bg-transparent rounded-md hover:bg-[#f2efed] transition-colors duration-300"
                    key={project.key}
                    >
                    <li className="text-[#202020] font-medium ">{project.label}</li>
                    </div>
                ))}
            </ul>
        </div>  
    </div>
    </>}
   </> 
  )
}

export default ActiveProjects