import { Layout } from 'antd';
import { Header } from '../common';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AuthLayout