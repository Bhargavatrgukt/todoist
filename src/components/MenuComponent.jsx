import React, { useContext, useState } from "react";
import {
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  DownOutlined,
  EllipsisOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu, Tooltip,Dropdown } from "antd";
import colorPalette from "../utils/colorPalette .js";
import MoreActions from "./MoreActions.jsx";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import DeleteConfirmModel from "./DeleteConfirmModel.jsx";
import ModalComponent from "./Modal.jsx";


const MenuComponent = ({ collapsed,
    setIsModalOpen,
    isModalOpen,
    setEditingProject,}) => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { projects } = useContext(ProjectsContext)

 


  const colorForHash = (colorName) => {
    return colorPalette.find(
      (colorDetails) => colorDetails.dataValue.toLowerCase() === colorName.toLowerCase()
    );
  };

  const formattedProjects = projects.slice(1).map((project) => {
    const colorDetails = colorForHash(project.color);
    const colorStyle = colorDetails ? colorDetails.color : project.color;

    return {
      key: `user-${project.id}`,
      label: (
        <div
          className="flex justify-between"
          onMouseEnter={() => setHoveredKey(`user-${project.id}`)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <Tooltip title={project.name} placement="right">
            <span style={{ color: colorStyle }}>#</span> {project.name}
          </Tooltip>
          {hoveredKey === `user-${project.id}` && (
            <div onClick={(e)=>e.stopPropagation()}>
                <Dropdown
                    trigger={["click"]}
                    menu={MoreActions({
                        project,
                        setDeleteModal,
                        setProjectToDelete,
                        setEditingProject,
                        setIsModalOpen, 
                      })}  
                      placement="rightTop"
                    >
                    <Tooltip title={"More Actions"}>
                        <EllipsisOutlined style={{ cursor: "pointer",fontSize:"28px" }} />
                    </Tooltip>
                </Dropdown>
            </div>
          )}
        </div>
      ),
    };
  });

  const favoriteProjects = projects.filter((project) => project.isFavorite).map((project) => {
    const colorDetails = colorForHash(project.color);
    const colorStyle = colorDetails ? colorDetails.color : project.color;

    return {
      key: `user-${project.id}`,
      label: (
        <div
          className="flex justify-between"
          onMouseEnter={() => setHoveredKey(`user-${project.id}`)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <Tooltip title={project.name} placement="right" trigger="hover">
            <span style={{ color: colorStyle }}>#</span> {project.name}
          </Tooltip>
          {hoveredKey === `user-${project.id}` && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                console.log("CLICKED");
              }}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <EllipsisOutlined style={{ fontSize: "22px" }} />
            </button>
          )}
        </div>
      ),
    };
  });

  const items = [
    {
      key: "add-task",
      icon: <PlusCircleOutlined style={{ color: "#C35646", fontSize: "18px" }} />,
      label: <span style={{ color: "#C35646", fontWeight: 800 }}>Add Task</span>,
    },
    {
      key: "inbox",
      icon: <InboxOutlined style={{ fontSize: "18px" }} />,
      label: (
        <div
          className="flex justify-between"
          onMouseEnter={() => setHoveredKey(`user-${projects[0]?.id}`)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <Tooltip title={projects[0]?.name} placement="right">
            <span style={{ color: "#808080" }}>#</span> {projects[0]?.name}
          </Tooltip>
        </div>
      ),
    },
    {
      key: "favorite-projects",
      label: (
        <span
          style={{ color: "#777E7E", fontWeight: 800 }}
          onClick={(e) => e.stopPropagation()}
        >
          Favorites
        </span>
      ),
      children: favoriteProjects,
    },
    {
      key: "user-projects",
      label: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{ color: "#777E7E", fontWeight: 800 }}
            onClick={(e) => e.stopPropagation()}
          >
            My Projects
          </span>
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
      ),
      children: formattedProjects,
    },
  ];

  return (
    <>
      {openDeleteModal && (
        <DeleteConfirmModel
          open={openDeleteModal}
          setOpen={setDeleteModal}
          project={projectToDelete}
        />
      )}
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "#fcba03",
            subMenuItemBg: "transparent",
          },
        },
      }}
    >
      <Menu
        defaultOpenKeys={["user-projects", "favorite-projects"]}
        mode="inline"
        expandIcon={({ isOpen }) =>
          isOpen ? (
            <DownOutlined style={{ fontSize: "12px" }} />
          ) : (
            <RightOutlined style={{ fontSize: "12px" }} />
          )
        }
        inlineCollapsed={collapsed}
        items={items}
        style={{
          background: "transparent",
          padding: "6px",
          margin: 0,
          border: 0,
        }}
        className="custom-menu"
      />
      <style>
        {`
          .custom-menu .ant-menu-item,
          .custom-menu .ant-menu-submenu-title {
            padding: 0 !important;
            margin: 0 !important;
          }
          .custom-menu .ant-menu-item-selected {
            background-color: #FFEEE5 !important;
            color: #d1453b !important;
          }
        `}
      </style>
    </ConfigProvider>
    </>
  );
};

export default MenuComponent;
