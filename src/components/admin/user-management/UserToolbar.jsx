import React from 'react';
import { 
  Input, 
  Select, 
  Button, 
  Space, 
  Row, 
  Col 
} from 'antd';
import { 
  SearchOutlined, 
  ReloadOutlined, 
  UserAddOutlined,
  DownloadOutlined 
} from '@ant-design/icons';

const { Option } = Select;

const UserToolbar = ({
  searchText,
  onSearchChange,
  roleFilter,
  onRoleChange,
  sexFilter,
  onSexChange,
  onRefresh,
  onAddUser,
  onExport
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <Row gutter={[16, 16]} align="middle">
        {/* Search Input */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Tìm theo tên, SĐT..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
        </Col>

        {/* Role Filter */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Vai trò"
            value={roleFilter}
            onChange={onRoleChange}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="">Tất cả vai trò</Option>
            <Option value="BasicMember">Basic Member</Option>
            <Option value="ProMember">Pro Member</Option>
            <Option value="PlusMember">Plus Member</Option>
            <Option value="Moderator">Moderator</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </Col>

        {/* Sex Filter */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Giới tính"
            value={sexFilter}
            onChange={onSexChange}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="">Tất cả</Option>
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Khác</Option>
          </Select>
        </Col>

        {/* Action Buttons */}
        <Col xs={24} lg={6}>
          <Space size="small" style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={onAddUser}
              size="middle"
            >
              Thêm user
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              size="middle"
            >
              Làm mới
            </Button>
            <Button
              type="default"
              icon={<DownloadOutlined />}
              onClick={onExport}
              size="middle"
            >
              Xuất Excel
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default UserToolbar;