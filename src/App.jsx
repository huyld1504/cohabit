import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/antd.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';

import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>    
    </>
  );
}

export default App;
