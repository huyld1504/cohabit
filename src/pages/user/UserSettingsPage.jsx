import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileApi } from '../../api/profile.api';
import { toast } from 'react-toastify';
import UpdateProfileModal from '../../components/user/UpdateProfileModal';
import UpdateCharacteristicsModal from '../../components/user/UpdateCharacteristicsModal';

const UserSettingsPage = () => {
  const {profile: user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCharacteristicsModalOpen, setIsCharacteristicsModalOpen] = useState(false);
  const [userCharacteristics, setUserCharacteristics] = useState([]);
  const [loadingCharacteristics, setLoadingCharacteristics] = useState(false);

  // Load user characteristics on component mount
  useEffect(() => {
    if (user) {
      loadUserCharacteristics();
    }
  }, [user]);

  const loadUserCharacteristics = async () => {
    try {
      setLoadingCharacteristics(true);
      const response = await profileApi.getCharacteristics();

      if (response && Array.isArray(response)) {
        setUserCharacteristics(response);
      } else if (user?.character && Array.isArray(user.character)) {
        // Fallback to user.character from Redux if API doesn't return data
        setUserCharacteristics(user.character);
      }
    } catch (error) {
      console.error('Error loading characteristics:', error);
      // Use user.character from Redux as fallback
      if (user?.character && Array.isArray(user.character)) {
        setUserCharacteristics(user.character);
      }
    } finally {
      setLoadingCharacteristics(false);
    }
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleOpenCharacteristicsModal = () => {
    setIsCharacteristicsModalOpen(true);
  };

  const handleCloseCharacteristicsModal = () => {
    setIsCharacteristicsModalOpen(false);
  };

  const handleProfileUpdateSuccess = (updatedProfile) => {
    console.log('Profile updated successfully:', updatedProfile);
  };

  const handleCharacteristicsUpdateSuccess = (updatedCharacteristics) => {
    console.log('Characteristics updated successfully:', updatedCharacteristics);
    setUserCharacteristics(updatedCharacteristics);
    toast.success('Tính cách đã được cập nhật thành công!');
  };

  const getSexLabel = (sex) => {
    switch (sex) {
      case 0: return 'Male';
      case 1: return 'Female';
      case 3: return 'Other';
      default: return 'Other';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Hồ sơ của tôi */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-3xl">Hồ sơ của tôi</h2>
        <button
          className="border border-[#1279a2] text-[#04537c] rounded-lg px-4 py-1 hover:bg-[#f0f8ff] cursor-pointer"
          onClick={handleOpenProfileModal}
        >
          Chỉnh sửa
        </button>
      </div>
      <div className="divide-y">
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Số điện thoại</span>
          <span className="w-2/3 text-lg">{user?.phone || 'Chưa cập nhật'}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Họ và tên</span>
          <span className="w-2/3 text-lg">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.fullName || 'Chưa cập nhật'
            }
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Ngày sinh</span>
          <span className="w-2/3 text-lg">{user?.yob || 'Chưa cập nhật'}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Giới tính</span>
          <span className="w-2/3 text-lg">{getSexLabel(user?.sex)}</span>
        </div>
      </div>

      {/* Tính cách của tôi */}
      <div className="flex items-center justify-between mt-8 mb-2">
        <h2 className="font-bold text-3xl">Tính cách của tôi</h2>
        <button 
          className="border border-[#1279a2] text-[#04537c] rounded-lg px-4 py-1 hover:bg-[#f0f8ff] cursor-pointer" 
          onClick={handleOpenCharacteristicsModal}
          disabled={loadingCharacteristics}
        >
          {loadingCharacteristics ? 'Đang tải...' : 'Chỉnh sửa'}
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {userCharacteristics.length > 0 ? (
          userCharacteristics.map((char, idx) => (
            <span key={idx} className="bg-[#1279a2] text-white rounded-full px-5 py-2 text-lg font-semibold">
              {typeof char === 'string' ? char : char?.title || char?.name || String(char)}
            </span>
          ))
        ) : (
          <span className="text-gray-500 italic">Chưa cập nhật tính cách</span>
        )}
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        open={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        userProfile={user}
        onUpdateSuccess={handleProfileUpdateSuccess}
      />

      {/* Update Characteristics Modal */}
      <UpdateCharacteristicsModal
        open={isCharacteristicsModalOpen}
        onClose={handleCloseCharacteristicsModal}
        userCharacteristics={userCharacteristics}
        onUpdateSuccess={handleCharacteristicsUpdateSuccess}
      />
    </div>
  );
};

export default UserSettingsPage;