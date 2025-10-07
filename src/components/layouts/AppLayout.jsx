import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/token.store.util';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { profileApi } from '../../api/profile.api';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/features/user.slice';

const AppLayout = () => {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const { token } = await getToken();
        if (!token) {
          toast.warning('Vui lòng đăng nhập để tiếp tục!');
          navigate('/login');
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error('Lỗi xác thực, vui lòng đăng nhập lại!');
        navigate('/login');
      }
    };

    checkAuthenticated();
  }, [navigate, dispatch, currentPath]);

  return (
    <Outlet />
  );
};

export default AppLayout;