import React,{useContext} from "react";
import { Button, Modal } from "antd";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import api from "../services/todoApi.js";

const DeleteConfirmModel = ({ open, setOpen, project }) => {
   const { deleteProject } = useContext(ProjectsContext)

  const handleDelete = async() => {
    try{
      deleteProject(project.id)
      setOpen(false); 
      await api.deleteProject(project.id)
    }catch(error){
      console.log(`${error} at deleting Model`)
    }
  };

  const handleCancel = () => {
    setOpen(false); 
  };

  return (
    <Modal
      open={open}
      title="Delete project?"
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>{`The ${project?.name} and all of its tasks will be permanently deleted.`}</p>
    </Modal>
  );
};

export default DeleteConfirmModel;
