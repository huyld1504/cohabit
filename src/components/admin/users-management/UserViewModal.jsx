import React from 'react';
import { Modal, Tag, Button } from 'antd';
import PropTypes from 'prop-types';

const UserViewModal = ({
  isVisible,
  user,
  onClose,
  getGradeColor,
  getStatusColor
}) => {
  return (
    <Modal
      title="Thông tin chi tiết người dùng"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>
      ]}
      width={500}
    >
      {user && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '12px' }}>
            <strong>Họ tên:</strong> {user.name}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Số điện thoại:</strong> {user.phone}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Thành phố:</strong> {user.city}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Ngày tham gia:</strong> {user.joinDate}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Gói:</strong> <Tag color={getGradeColor(user.grade)}>{user.grade}</Tag>
          </div>
          <div>
            <strong>Trạng thái:</strong> <Tag color={getStatusColor(user.status)}>
              {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
          </div>
        </div>
      )}
    </Modal>
  );
};

UserViewModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  getGradeColor: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
};

export default UserViewModal;
