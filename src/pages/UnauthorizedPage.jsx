import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UpgradePrompt from '../components/common/UpgradePrompt';
import { USER_ROLES } from '../constants/roles.constant';

const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { requiredRoles, userRole } = location.state || {};

  // If we have required roles info, show upgrade prompt
  if (requiredRoles && requiredRoles.length > 0) {
    // Determine the highest required role
    let requiredRole = USER_ROLES.PLUS_MEMBER;
    if (requiredRoles.includes(USER_ROLES.ADMIN)) {
      requiredRole = USER_ROLES.ADMIN;
    } else if (requiredRoles.includes(USER_ROLES.PRO_MEMBER)) {
      requiredRole = USER_ROLES.PRO_MEMBER;
    } else if (requiredRoles.includes(USER_ROLES.PLUS_MEMBER)) {
      requiredRole = USER_ROLES.PLUS_MEMBER;
    }

    return <UpgradePrompt requiredRole={requiredRole} />;
  }

  // Default unauthorized message
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị từ chối</h1>
          <p className="text-gray-600">
            Xin lỗi, bạn không có quyền truy cập trang này.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Quay lại
          </button>
        </div>

        {userRole && (
          <div className="mt-6 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              Tài khoản hiện tại: <strong>{userRole}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnauthorizedPage;
