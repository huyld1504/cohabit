import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const PostToolbar = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange
}) => {
  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ duyệt' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'rejected', label: 'Bị từ chối' },
    { value: 'draft', label: 'Nháp' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'công nghiệp', label: 'Công nghiệp' },
    { value: 'ẩm thực', label: 'Ẩm thực' },
    { value: 'du lịch', label: 'Du lịch' },
    { value: 'bất động sản', label: 'Bất động sản' },
    { value: 'giáo dục', label: 'Giáo dục' }
  ];

  return (
    <div className="mb-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Tìm kiếm bài viết..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-80"
          />

          <Space>
            <Select
              value={statusFilter}
              onChange={onStatusChange}
              options={statusOptions}
              className="w-40"
            />

            <Select
              value={categoryFilter}
              onChange={onCategoryChange}
              options={categoryOptions}
              className="w-40"
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

PostToolbar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string,
  onStatusChange: PropTypes.func,
  categoryFilter: PropTypes.string,
  onCategoryChange: PropTypes.func,
};

export default PostToolbar;
