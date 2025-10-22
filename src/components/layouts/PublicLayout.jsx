import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { profileApi } from '../../api/profile.api';
import { useDispatch } from 'react-redux';
import { setUserProfile, setProfileLoading } from '../../redux/features/user.slice';

const PublicLayout = () => {
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  useEffect(() => {
    const getProfile = async () => {
      try {
        dispatch(setProfileLoading(true));
        const response = await profileApi.getProfile();
        if (response) {
          dispatch(setUserProfile(response));
        } else {
          dispatch(setProfileLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setProfileLoading(false));
      }
    };
    getProfile();
  }, [dispatch, currentPath]);
  return (
    <Outlet />
  );
};

export default PublicLayout;