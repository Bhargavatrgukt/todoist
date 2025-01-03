import { Select, Switch, Form, Input,Modal,Button } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import colorPalette from '../utils/colorPalette ';
import { useContext, useState,useEffect } from 'react';
import api from '../services/todoApi';
import { ProjectsContext } from '../context/ProjectsContext';

const ModalComponent = ({ isModalOpen, setIsModalOpen, editingProject, setEditingProject}) => {

  const [projectName, setProjectName] = useState(editingProject?.name || "");
  const [isFavorite, setIsFavorite] = useState(editingProject?.isFavorite || false);
  const [selectedColor, setSelectedColor] = useState(editingProject?.color || "charcoal");
  const {addProject, updateProject }= useContext(ProjectsContext);

    const selectOptions=colorPalette.map((colorDetails)=>{
        return {
            value:colorDetails.dataValue,
            label: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      backgroundColor: colorDetails.color,
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                    }}
                  ></span>
                  <span>{colorDetails.colorName}</span>
                </div>
              ),
        }
    })

    // console.log(selectOptions.length)

    const [form] = Form.useForm();
    const handleSave = async () => {
        try {
          setIsModalOpen(false);
            if (editingProject) {
              await api.updateProject(editingProject.id, { name: projectName, isFavorite, color: selectedColor });
               updateProject({id:editingProject.id,  name: projectName, isFavorite, color: selectedColor })
              console.log("Project updated!");
            }else{
                const project = await api.addProject({name: projectName,isFavorite: isFavorite,color: selectedColor});
                addProject(project);
            }
            setEditingProject(null);
         
        } catch (error) {
            console.error("Error adding project:", error.response ? error.response.data : error);
        }
    }
    

      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const onChangeSwitch = (checked) => {
        setIsFavorite(checked);
        console.log(`switch to ${checked}`);
      };
 
      


  return (
    <Modal  title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {editingProject ? "Edit Project":"Add Project" }
          <InfoCircleOutlined />
        </div>
      } 
      open={isModalOpen} onCancel={handleCancel}
    //   mask={false}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          danger
          disabled={projectName.length===0}
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
      >
       <Form  
            form={form}
            layout="vertical"
            >
            <Form.Item label="Name">
                <Input  maxLength={120}  value={projectName} onChange={event=>setProjectName(event.target.value)} />
                <p   className={`text-right mt-2 ${projectName.length === 120 ? "text-red-500" : ""}`}>{projectName.length}/120</p>
            </Form.Item>        
            <Form.Item
            label="Color">
            <Select
                value={selectedColor}
                // defaultValue="charcoal"  
                options={selectOptions}
                onChange={(value) => setSelectedColor(value)}
            />
            </Form.Item>
            <Form.Item>
            <label style={{ display: 'flex', alignItems: 'center' }}>
                <Switch onChange={onChangeSwitch}  checked={isFavorite}  />
                <span className="p-3" style={{ marginLeft: '8px' }}>Add to Favorites</span>
            </label>
            </Form.Item>
        </Form>
     </Modal>
  )
}

export default ModalComponent