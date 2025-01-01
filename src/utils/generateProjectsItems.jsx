import { colorForHash } from "./colorUtils";
import MoreActions from "../components/MoreActions";
import {EllipsisOutlined} from "@ant-design/icons";
import {  Tooltip, Dropdown } from "antd";

const generateProjectItems = (projects, prefix ,hoveredKey,
  setHoveredKey,
  selectedProjectId,
  setSelectedProjectId,
  setDeleteModal,
  setProjectToDelete,
  setEditingProject,
  setIsModalOpen,
  updateProject,active=true) => {
  return projects.map((project) => {
    const colorDetails = colorForHash(project.color);
    const colorStyle = colorDetails ? colorDetails.color : project.color;

    return {
      key: `${prefix}-${project.id}`,
      label: (
        <div
          className={`flex justify-between ${
            selectedProjectId === project.id && active
              ? `bg-[#ffeee5] text-[#d1453b]`
              : ""
          }`}
          onMouseEnter={() => setHoveredKey(`${prefix}-${project.id}`)}
          onMouseLeave={() => setHoveredKey(null)}
          onClick={() => setSelectedProjectId(project.id)}
        >
          <Tooltip title={project.name} placement="right">
            <span style={{ color: colorStyle }}>#</span> {project.name}
          </Tooltip>
          <Dropdown
            trigger={["click"]}
            menu={MoreActions({
              project,
              setDeleteModal,
              setProjectToDelete,
              setEditingProject,
              setIsModalOpen,
              updateProject,
            })}
            placement="rightTop"
          >
            <Tooltip title={"More Actions"}>
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
            </Tooltip>
          </Dropdown>
        </div>
      ),
    };
  });
};

export default generateProjectItems;
