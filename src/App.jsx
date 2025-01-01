import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from './components/SideBar';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import Content from './components/Content.jsx';
import ModelProvider from './context/ModelContext.jsx';

const { Content: AntContent } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProjectsProvider>
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
    </ProjectsProvider>
  );
};

export default App;
