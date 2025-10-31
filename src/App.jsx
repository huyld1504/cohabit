import {ConfigProvider} from 'antd';
import {themeConfig} from './theme/antd.config';
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/index';
import {ToastContainer} from 'react-toastify';
import {ChatProvider} from './contexts/ChatContext';

import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <>
            <ConfigProvider theme={themeConfig}/>
            <ChatProvider>
                <RouterProvider router={router}/>
            </ChatProvider>
            <ToastContainer
                autoClose={3000}
                position="bottom-left"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
