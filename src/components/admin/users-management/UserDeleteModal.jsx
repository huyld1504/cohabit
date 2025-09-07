import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

const UserDeleteModal = ({
  isVisible,
  user,
  onCancel,
  onConfirm
}) => {
  return (
    <Modal
      title="Xóa người dùng"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          onClick={onConfirm}
        >
          Xóa
        </Button>
      ]}
      width={400}
    >
      {user && (
        <p>
          Bạn có chắc chắn muốn xóa người dùng <strong>"{user.name}"</strong>?
        </p>
      )}
    </Modal>
  );
};

UserDeleteModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default UserDeleteModal;
