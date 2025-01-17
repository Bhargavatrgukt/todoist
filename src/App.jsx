import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from './components/SideBar';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import Content from './components/Content.jsx';
import ModelProvider from './context/ModelContext.jsx';
import { Routes,Route } from 'react-router';
import AuthProvider from './context/AuthContext.jsx';
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx';

const { Content: AntContent } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AuthProvider>
      <ProjectsProvider>
          <ModelProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path='/login' element={<LogIn />} /> 
             <Route element={<PrivateRoute />}>
              <Route
                  path="/*"
                  element={
                    <Layout style={{ minHeight: '100vh' }}>
                      <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                      <Layout>
                        <AntContent style={{ padding: '20px', background: '#fff' }}>
                          <Content />
                        </AntContent>
                      </Layout>
                    </Layout>
                  }
                />
              </Route>
          </Routes>  
          </ModelProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
};

export default App;
