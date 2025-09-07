import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const UserToolbar = ({
  searchText,
  onSearchChange,
  onFilter,
  onExport,
  onAddUser
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <Input
          placeholder="Tìm kiếm theo tên, email, số điện thoại..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-80"
        />
        <Button icon={<FilterOutlined />} onClick={onFilter}>
          Bộ lọc
        </Button>
      </div>

      <Space>
        <Button
          icon={<DownloadOutlined />}
          onClick={onExport}
        >
          Xuất file
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddUser}
          className='!bg-[#1279a2]'
        >
          Thêm người dùng
        </Button>
      </Space>
    </div>
  );
};

UserToolbar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
  onExport: PropTypes.func,
  onAddUser: PropTypes.func,
};

export default UserToolbar;
