import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import SideBar from './components/SideBar';
import Content from './components/Content.jsx';
import ModelProvider from './context/ModelContext.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProjects } from './features/projectsSlice.js';
import { fetchTasks } from './features/tasksSlice.js';

const { Content: AntContent } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const projectStatus = useSelector((state) => state.projects.status);
  const tasksStatus=useSelector((state)=>state.tasks.status);
  const dispatch=useDispatch()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(()=>{
    if(projectStatus==="idle"){
       dispatch(fetchProjects())
    }
    if(tasksStatus==="idle"){
       dispatch(fetchTasks())
    }
  },[])
  

  return (
      <ModelProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <Layout>
          <AntContent style={{ padding: '20px', background: '#fff' }}>
              <Content />
          </AntContent>
          </Layout>
        </Layout>
      </ModelProvider>
  );
};

export default App;
