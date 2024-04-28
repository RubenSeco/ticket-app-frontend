import React, { useContext } from 'react';
import { Route, Navigate, Link, Routes } from "react-router-dom";
import { Login, CreateTicket, Desktop, Queue } from './index.js';

import { Layout, Menu, theme } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { UiContext } from '../context/UiContext.js';
const { Sider } = Layout;


export const RouterPage = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {isMenuOpen} = useContext(UiContext);
  
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider  collapsedWidth="0" breakpoint='md' hidden={!isMenuOpen}> 
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to='/login'>Login</Link>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <Link to='/queue'>Queue</Link>,
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to='/create'>Create ticket</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout' style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
        <Routes>
          <Route path='/login' Component={Login}></Route>
          <Route path='/queue' Component={Queue}></Route>
          <Route path='/create' Component={CreateTicket}></Route>

          <Route path='/desktop' Component={Desktop}></Route>
          <Route path='/*' element={<Navigate to='/login' />}></Route>

        </Routes>
      </Layout>
    </Layout>
  );
};

