import React from 'react';
import { Switch, Select, Input, Button, Space, Divider } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import AdminPaper from '../../components/admin/AdminPaper';

const { Option } = Select;

const AdminSettingsPage = () => {
  const headerAction = (
    <Space>
      <Button icon={<ReloadOutlined />}>
        Đặt lại
      </Button>
      <Button type="primary" icon={<SaveOutlined />}>
        Lưu cài đặt
      </Button>
    </Space>
  );

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <AdminPaper
        title="Cài đặt chung"
        subtitle="Cấu hình cơ bản của hệ thống"
        headerAction={headerAction}
        size="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên ứng dụng
            </label>
            <Input defaultValue="Cohabit" size="large" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngôn ngữ mặc định
            </label>
            <Select defaultValue="vi" size="large" className="w-full">
              <Option value="vi">Tiếng Việt</Option>
              <Option value="en">English</Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Múi giờ
            </label>
            <Select defaultValue="asia/ho_chi_minh" size="large" className="w-full">
              <Option value="asia/ho_chi_minh">Asia/Ho_Chi_Minh</Option>
              <Option value="utc">UTC</Option>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Chế độ bảo trì</div>
              <div className="text-xs text-gray-500">Tạm thời tắt ứng dụng để bảo trì</div>
            </div>
            <Switch />
          </div>
        </div>
      </AdminPaper>

      {/* Notification Settings */}
      <AdminPaper
        title="Cài đặt thông báo"
        subtitle="Quản lý cách thức gửi thông báo"
        size="default"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="text-sm font-medium text-gray-700">Email thông báo</div>
              <div className="text-xs text-gray-500">Gửi email khi có hoạt động quan trọng</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="text-sm font-medium text-gray-700">SMS thông báo</div>
              <div className="text-xs text-gray-500">Gửi SMS cho các thông báo khẩn cấp</div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-medium text-gray-700">Push notification</div>
              <div className="text-xs text-gray-500">Hiển thị thông báo trên trình duyệt</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </AdminPaper>

      {/* Security Settings */}
      <AdminPaper
        title="Cài đặt bảo mật"
        subtitle="Quản lý tính năng bảo mật của hệ thống"
        size="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian hết hạn session (phút)
            </label>
            <Input defaultValue="30" type="number" size="large" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lần đăng nhập sai tối đa
            </label>
            <Input defaultValue="5" type="number" size="large" />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm font-medium text-gray-700">Xác thực 2 bước</div>
                <div className="text-xs text-gray-500">Yêu cầu mã OTP khi đăng nhập</div>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </AdminPaper>
    </div>
  );
};

export default AdminSettingsPage;
