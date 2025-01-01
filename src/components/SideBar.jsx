import React, { useState ,useContext} from 'react';
import { Layout } from 'antd';
import MenuComponent from './MenuComponent';
import ModalComponent from './Modal';
import ButtonComponent from './ButtonComponent';
import { ModelContext } from '../context/ModelContext';

const { Sider } = Layout;

const SideBar = ({ collapsed, toggleCollapsed }) => {
  
  const {isModalOpen,setIsModalOpen,editingProject, setEditingProject}=useContext(ModelContext)

  return (
    <Sider
      width={300} 
      style={{
        background: collapsed ? '#FFFFFF' : '#fcfaf8', 
      }}
      collapsed={collapsed}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px', 
          left: collapsed ? '20px' : '250px', 
          transition: 'all 0.1s ease-in-out',
          zIndex: 10,
        }}
      >
        <ButtonComponent toggleCollapsed={toggleCollapsed} />
      </div>

      {!collapsed && (
        <div style={{ paddingTop: '40px', paddingLeft: '20px' }}>
          <MenuComponent
            collapsed={collapsed}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            setEditingProject={setEditingProject}
          />
        </div>
      )}

      {isModalOpen && (
        <ModalComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
        />
      )}
    </Sider>
  );
};

export default SideBar;
