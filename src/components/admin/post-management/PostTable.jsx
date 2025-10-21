import React from 'react';
import { Table, Dropdown, Button } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PostInfo from './PostInfo';
import AuthorInfo from './AuthorInfo';
import PostStatusBadge from './PostStatusBadge';
import PropTypes from 'prop-types';

const PostTable = ({
  data,
  loading,
  selectedRowKeys,
  onSelectionChange,
  pagination,
  onView,
  onEdit,
  onDelete
}) => {
  const actionMenuItems = [
    {
      key: 'view',
      label: 'Xem chi tiết',
      icon: <EyeOutlined />,
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (key, record) => {
    switch (key) {
      case 'view':
        onView && onView(record);
        break;
      case 'edit':
        onEdit && onEdit(record);
        break;
      case 'delete':
        onDelete && onDelete(record);
        break;
      default:
        break;
    }
  };

  const mapStatus = (s) => {
    switch (s) {
      case 0:
        return 'chờ duyệt';
      case 1:
        return 'đã xuất bản';
      case -1:
        return 'bị từ chối';
      default:
        return String(s);
    }
  };

  const columns = [
    {
      title: 'Bài viết',
      key: 'post',
      width: 360,
      render: (_, record) => (
        <PostInfo
          thumbnail={record.imageUrl && record.imageUrl.length > 0 ? record.imageUrl[0] : ''}
          title={record.title}
          description={record.description}
        />
      ),
    },
    {
      title: 'Tác giả',
      key: 'author',
      width: 200,
      render: (_, record) => (
        <AuthorInfo
          avatar={record.user?.avatarUrl}
          name={`${record.user?.firstName || ''} ${record.user?.lastName || ''}`.trim()}
        />
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 260,
      render: (address) => <div className="text-sm text-gray-600">{address}</div>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (price) => price != null ? new Intl.NumberFormat('vi-VN').format(price) + ' ₫' : '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => <PostStatusBadge status={mapStatus(status)} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: actionMenuItems,
            onClick: ({ key }) => handleMenuClick(key, record)
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const tablePagination = pagination === false ? false : {
    ...pagination,
    showSizeChanger: false,
    showQuickJumper: false,
    simple: false,
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.postId || record.id}
      rowSelection={rowSelection}
      loading={loading}
      pagination={tablePagination}
      scroll={{ x: 1400 }}
    />
  );
};

PostTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onSelectionChange: PropTypes.func,
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PostTable;
