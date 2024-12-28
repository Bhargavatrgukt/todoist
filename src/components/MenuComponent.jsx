import React from "react";
import {PlusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import colorPalette from "../utils/colorPalette ";

const MenuComponent = ({projects,collapsed}) => {
  
  const colorForHash=(colorName)=>{
    return colorPalette.find(colorDetails=>colorDetails.dataValue.toLowerCase()===colorName.toLowerCase())
  }

  const formattedProjects=projects.map((project)=>{
    const colorDetails = colorForHash(project.color);
    const colorStyle = colorDetails ? colorDetails.color : project.color;
    // console.log(colorStyle)
    return{key:`user-${project.id}`,label:(
    <span>
       <span style={{ color: colorStyle }}>#</span> {project.name}
    </span>
  ),}})

  const favoriteProjects=projects.filter(project=>project.isFavorite).map((project)=>{
    const colorDetails = colorForHash(project.color);
    const colorStyle = colorDetails ? colorDetails.color : project.color;
    // console.log(colorStyle)
    return{key:`user-${project.id}`,label:(
    <span>
       <span style={{ color: colorStyle }}>#</span> {project.name}
    </span>
  ),}})

  // const addProject=()=>{
  //   return(
  //     <div>

  //     </div>
  //   )
  // }

  const items = [
    {
      key: 'create-task',
      icon: <PlusCircleOutlined />,
      label: 'Create Task',
    },
    {
      key:"favorite-projects",
      label:"Favorites",
      children:favoriteProjects
    },
    {
      key: "user-projects",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" ,justifyContent:"space-between"}}>
          <span>My Projects</span>
            <PlusOutlined />
        </div>
      ),
      children: formattedProjects,
    },
  ];
  return (
    <Menu
      defaultSelectedKeys={["user-projects"]}
      defaultOpenKeys={["user-projects", "favorite-projects"]}
      mode="inline"
      // theme="dark"
      inlineCollapsed={collapsed}
      items={items}
      style={{
        background: "transparent",
        padding: "6px",
        margin: "0px",
        border: "0",
      }}
    />
  );
};

export default MenuComponent;
