import React,{useContext} from "react";
import { Button, Modal } from "antd";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import api from "../services/todoApi.js";
import { useNavigate } from "react-router";
import { deleteProject } from "../features/projectsSlice.js";
import { useDispatch } from "react-redux";

const DeleteConfirmModel = ({ open, setOpen, project }) => {
  const dispatch=useDispatch()
  //  const { deleteProject } = useContext(ProjectsContext)
   const navigate = useNavigate(); 

  const handleDelete = async() => {
    try{
      // navigate("/")
      await api.deleteProject(project.id)
      dispatch(deleteProject(project.id))
      setOpen(false); 
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
