export const getProjects = async () => {
  try {
    const response = await fetch("http://localhost:3000/app/projects");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/app/tasks");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const api = {
  addProject: async (project) => {
    try {
      const response = await fetch("http://localhost:3000/app/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error(`Failed to add project: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  },
  updateProject: async (id, project) => {
    try {
      const response = await fetch(`http://localhost:3000/app/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  },
  deleteProject: async (id) => {
    try {
      await fetch(`http://localhost:3000/app/projects/${id}`, {
        method: "DELETE", // No body needed for DELETE
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },
  addTask: async (task) => {
    try {
      const response = await fetch("http://localhost:3000/app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  },
  updateTask: async (id, task) => {
    try {
      const response = await fetch(`http://localhost:3000/app/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  },
  deleteTask: async (id) => {
    try {
      await fetch(`http://localhost:3000/app/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },
};

export default api;
