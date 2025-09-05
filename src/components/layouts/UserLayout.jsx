import { Content } from 'antd/es/layout/layout';
import React from 'react'
import { Header } from '../common';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default UserLayout