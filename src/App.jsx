import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/antd.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import { ToastContainer } from 'react-toastify';

import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
      <ToastContainer />
    </>
  );
}

export default App;
