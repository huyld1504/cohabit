import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/token.store.util';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { profileApi } from '../../api/profile.api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/features/user.slice';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const { token } = await getToken();
        if (!token) {
          toast.warning('Vui lòng đăng nhập để tiếp tục!');
          navigate('/login');
          return;
        }

        // Also load profile if not loaded yet
        if (!user?.profile && !user?.loading) {
          try {
            const response = await profileApi.getProfile();
            if (response) {
              dispatch(setUserProfile(response));
            }
          } catch (error) {
            console.log('Failed to load profile:', error);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Lỗi xác thực, vui lòng đăng nhập lại!');
        navigate('/login');
      }
    };

    checkAuthenticated();
  }, [navigate, dispatch]);

  return (
    <Outlet />
  );
};

export default AppLayout;