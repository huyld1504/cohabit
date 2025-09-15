import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const AuthorInfo = ({ avatar, name }) => {
  return (
    <div className="flex items-center !space-x-3">
      <Avatar
        size={40}
        src={avatar}
        icon={<UserOutlined />}
        className="flex-shrink-0 !bg-[#1279a2]"
      />
      <div className="min-w-0 flex-1">
        <div className="font-medium text-gray-900 truncate">
          {name}
        </div>
      </div>
    </div>
  );
};

AuthorInfo.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default AuthorInfo;
