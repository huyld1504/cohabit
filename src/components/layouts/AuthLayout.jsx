import { Layout } from 'antd';
import { Footer, Header } from '../common';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1 min-h-screen bg-white">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default AuthLayout