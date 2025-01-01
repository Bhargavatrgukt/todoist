import {EditOutlined,HeartOutlined,DeleteOutlined,HeartFilled} from "@ant-design/icons"
import { ProjectsContext } from "../context/ProjectsContext";
import { useContext } from "react";
import api from "../services/todoApi";

const MoreActions = ({ project, setDeleteModal, setProjectToDelete, setEditingProject, setIsModalOpen}) => {
  const {updateProject}=useContext(ProjectsContext)

  const handleEdit = () => {
    setEditingProject(project);
    setIsModalOpen(true);
  };
  
  const handleUpdate = async (updatedProject) => {
    try {
      updateProject(updatedProject);
      const msg = await api.updateProject(updatedProject.id, {
        isFavorite: updatedProject.isFavorite,
      });
      console.log("Update successful:", msg);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const toggleFavorite = () => {
    const updatedProject = { ...project, isFavorite: !project.isFavorite };
    handleUpdate(updatedProject);
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <div className="flex gap-5" onClick={handleEdit}>
          <EditOutlined />
          <p>Edit</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
        className="flex gap-5"
        onClick={toggleFavorite}
      >
        {project.isFavorite?<HeartFilled />:<HeartOutlined />}
        <p>{project.isFavorite ? "Remove from Favorites" : "Add to Favorites"}</p>
      </div>
      
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="flex gap-5 text-red"
          onClick={() => {
            console.log("clicked")
            setProjectToDelete(project);
            setDeleteModal(true);
          }}
        >
          <DeleteOutlined />
          <p>Delete</p>
        </div>
      ),
    },
  ];

  return {
    items: menuItems,
  };
};

export default MoreActions;
