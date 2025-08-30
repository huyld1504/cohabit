import { Layout } from 'antd';
import { Footer, Header } from '../common';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default AppLayout