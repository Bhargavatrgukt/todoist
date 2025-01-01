import { useState } from "react";

export const useProjectState = () => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  return {
    hoveredKey,
    setHoveredKey,
    selectedProjectId,
    setSelectedProjectId,
    openDeleteModal,
    setDeleteModal,
    projectToDelete,
    setProjectToDelete,
  };
};
