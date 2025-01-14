import React, { useContext,useState} from "react";
import { PlusCircleOutlined, PlusOutlined, RightOutlined, DownOutlined, InboxOutlined} from "@ant-design/icons";
import { ConfigProvider, Menu, Tooltip, Dropdown } from "antd";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import DeleteConfirmModel from "./DeleteConfirmModel.jsx";
import { useProjectState } from "../hooks/projectHook.js";
import generateProjectItems from "../utils/generateProjectsItems.jsx";
import { Link } from "react-router";
import TaskModel from "./TaskModel.jsx";

const MenuComponent = ({ collapsed, setIsModalOpen, setEditingProject }) => {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const {
     hoveredKey,
    setHoveredKey,
    selectedProjectId,
    setSelectedProjectId,
    openDeleteModal,
    setDeleteModal,
    projectToDelete,
    setProjectToDelete,
  } = useProjectState();
  const { projects, updateProject } = useContext(ProjectsContext);
  

  const formattedProjects = generateProjectItems(projects.slice(1,), "user", hoveredKey,
  setHoveredKey,
  selectedProjectId,
  setSelectedProjectId,
  setDeleteModal,
  setProjectToDelete,
  setEditingProject,
  setIsModalOpen,
  updateProject);

  const favoriteProjects = generateProjectItems(
    projects.slice(1).filter((project) => project.is_favorite),
    "favorite",
    hoveredKey,
    setHoveredKey,
    selectedProjectId,
    setSelectedProjectId,
    setDeleteModal,
    setProjectToDelete,
    setEditingProject,
    setIsModalOpen,
    updateProject
  );

  
  const items = [
    {
      key: "add-task",
      icon: <PlusCircleOutlined style={{ color: "#C35646", fontSize: "18px" }} />,
      label: <span style={{ color: "#C35646", fontWeight: 800 }}  onClick={() => setTaskModalOpen(true)} >Add Task</span>,
    },
    {
      key: "inbox",
      icon: <InboxOutlined style={{ fontSize: "18px" }} />,
      label: (
        <Link to={`/${projects[0]?.name.toLowerCase()}-${projects[0]?.id}`}>
          <div
            className="flex justify-between"
            onMouseEnter={() => setHoveredKey(`user-${projects[0]?.id}`)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <Tooltip title={projects[0]?.name} placement="right">
              <span style={{ color: "#808080" }}>#</span> {projects[0]?.name}
            </Tooltip>
          </div>
        </Link>
      ),
    },
    {
      key: "favorite-projects",
      label: (
        <span style={{ color: "#777E7E", fontWeight: 800 }} onClick={(e) => e.stopPropagation()}>
          Favorites
        </span>
      ),
      children: favoriteProjects,
    },
    {
      key: "user-projects",
      label: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#777E7E", fontWeight: 800 }} onClick={(e) => e.stopPropagation()}>
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
        <DeleteConfirmModel open={openDeleteModal} setOpen={setDeleteModal} project={projectToDelete} />
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
            isOpen ? <DownOutlined style={{ fontSize: "12px" }} /> : <RightOutlined style={{ fontSize: "12px" }} />
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
      {taskModalOpen&&<TaskModel taskModalOpen={taskModalOpen} setTaskModalOpen={setTaskModalOpen} />}
    </>
  );
};

export default MenuComponent;
