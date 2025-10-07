import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { profileApi } from '../../api/profile.api';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/features/user.slice';

const PublicLayout = () => {
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await profileApi.getProfile();
        if (response) {
          dispatch(setUserProfile(response));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [dispatch, currentPath]);
  return (
    <Outlet />
  );
};

export default PublicLayout;