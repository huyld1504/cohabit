import React from 'react';
import { Table, Dropdown, Button } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PostInfo from './PostInfo';
import AuthorInfo from './AuthorInfo';
import CategoryBadge from './CategoryBadge';
import PostStatusBadge from './PostStatusBadge';
import dayjs from 'dayjs';
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
        onView(record);
        break;
      case 'edit':
        onEdit(record);
        break;
      case 'delete':
        onDelete(record);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Bài viết',
      key: 'post',
      width: 300,
      render: (_, record) => (
        <PostInfo
          thumbnail={record.thumbnail}
          title={record.title}
          description={record.description}
        />
      ),
    },
    {
      title: 'Tác giả',
      key: 'author',
      width: 180,
      render: (_, record) => (
        <AuthorInfo
          avatar={record.author.avatar}
          name={record.author.name}
        />
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => <CategoryBadge category={category} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <PostStatusBadge status={status} />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 100,
      render: (date) => dayjs(date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      rowSelection={rowSelection}
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: false,
        showQuickJumper: false,
        simple: false,
      }}
      scroll={{ x: 1200 }}
    />
  );
};

PostTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onSelectionChange: PropTypes.func,
  pagination: PropTypes.object,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PostTable;
