import { EditOutlined, HeartOutlined, DeleteOutlined, HeartFilled } from "@ant-design/icons";
import api from "../services/todoApi";


const MoreActions = ({ project, setDeleteModal, setProjectToDelete, setEditingProject, setIsModalOpen, updateProject }) => {
  const handleEdit = () => {
    setEditingProject(project);
    setIsModalOpen(true);
  };
  const handleUpdate = async (updatedProject) => {
    try {
      updateProject(updatedProject);
      const msg = await api.updateProject(updatedProject.id, {
        is_favorite: updatedProject.is_favorite,
        name: updatedProject.name, 
      });
      console.log("Update successful:", msg);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const toggleFavorite = () => {
    const updatedProject = { ...project, is_favorite: !project.is_favorite };
    handleUpdate(updatedProject);
  };

  const handleDelete = () => {
    setProjectToDelete(project);
    setDeleteModal(true);
  };

  const renderMenuItem = (icon, label, onClick) => (
    <div className="flex gap-5" onClick={onClick}>
      {icon}
      <p>{label}</p>
    </div>
  );

  return {
    items: [
      {
        key: "1",
        label: renderMenuItem(<EditOutlined />, "Edit", handleEdit),
      },
      {
        key: "2",
        label: renderMenuItem(
          project.is_favorite? <HeartFilled /> : <HeartOutlined />,
          project.iis_favorite? "Remove from Favorites" : "Add to Favorites",
          toggleFavorite
        ),
      },
      {
        key: "3",
        label: renderMenuItem(
          <DeleteOutlined />,
          "Delete",
          handleDelete
        ),
      },
    ]
  };
};

export default MoreActions;
