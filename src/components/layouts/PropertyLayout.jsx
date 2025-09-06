import { Layout } from 'antd';
import React from 'react'
import { Header } from '../common';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const PropertyLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default PropertyLayout