import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import projectsReducer from "../features/projectsSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});
