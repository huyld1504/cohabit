import React from 'react';
import { Button, Space } from 'antd';
import PropTypes from 'prop-types';

const UserSelectedActions = ({ selectedCount, onDelete, onExport }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
      <Space>
        <span>Đã chọn {selectedCount} người dùng</span>
        <Button size="small" onClick={onDelete}>
          Xóa
        </Button>
        <Button size="small" onClick={onExport}>
          Xuất
        </Button>
      </Space>
    </div>
  );
};

UserSelectedActions.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onExport: PropTypes.func,
};

export default UserSelectedActions;
