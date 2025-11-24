import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../common';
import FloatingChatButton from '../chat/FloatingChatButton';
import { Content } from 'antd/es/layout/layout';

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1" style={{ backgroundColor: '#FFFFFF' }}>
        <Outlet />
      </Content>
      <Footer />

      {/* AI Chat Assistant */}
      <FloatingChatButton />
    </Layout>
  );
};

export default MainLayout;
