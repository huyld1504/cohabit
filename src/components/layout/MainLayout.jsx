import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
