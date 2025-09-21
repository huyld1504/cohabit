import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Card, message, Divider } from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import ImageUpload from './ImageUpload';
import AmenitySelector from './AmenitySelector';
import RichTextEditor from './RichTextEditor';

const { TextArea } = Input;

const CreatePostForm = ({ onSubmit, loading = false, initialValues = {} }) => {
  const [form] = Form.useForm();
  const [previewMode, setPreviewMode] = useState(false);

  // Template nội dung mẫu cho từng phần
  const roomInfoTemplate = `
    <h3><strong>Thông tin nhà trọ</strong></h3>
    <ul>
      <li>Diện tích: [X] m²</li>
      <li>Số người ở tối đa: [X] người</li>
      <li>Tình trạng nội thất: Đầy đủ/Cơ bản/Trống</li>
      <li>Vị trí: Tầng [X], hướng [hướng nhà]</li>
      <li>Tiện nghi khác: [mô tả thêm]</li>
    </ul>
  `;

  const rentalTermsTemplate = `
    <h3><strong>Điều khoản thuê trọ</strong></h3>
    <ul>
      <li>Thời gian thuê tối thiểu: [X] tháng</li>
      <li>Thanh toán: Hàng tháng vào ngày [X] của tháng</li>
      <li>Giờ vào/ra: Tự do (trước 22h30)</li>
      <li>Không hút thuốc trong nhà</li>
      <li>Không nuôi thú cưng</li>
      <li>Quy định khách: [nêu rõ quy định]</li>
    </ul>
  `;

  const depositPolicyTemplate = `
    <h3><strong>Chính sách cọc & hủy thuê</strong></h3>
    <ul>
      <li>Cọc trước: [X] tháng tiền thuê</li>
      <li>Hoàn cọc: 100% nếu phòng không hư hỏng</li>
      <li>Thông báo hủy thuê: Trước [X] ngày</li>
      <li>Chi phí dịch vụ khác: Điện, nước, Internet theo thực tế</li>
      <li>Phí phạt (nếu có): [mô tả chi tiết]</li>
    </ul>
  `;

  const handleSubmit = async (values) => {
    try {
      // Validation bổ sung
      if (!values.images || values.images.length === 0) {
        message.error('Vui lòng upload ít nhất 1 hình ảnh');
        return;
      }

      if (!values.amenities || values.amenities.length === 0) {
        message.error('Vui lòng chọn ít nhất 1 tiện ích');
        return;
      }

      const formData = {
        ...values,
        createdAt: new Date().toISOString(),
        status: 'active',
        views: 0,
        contacts: 0
      };

      await onSubmit?.(formData);
      message.success('Tạo bài đăng thành công!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('Có lỗi xảy ra khi tạo bài đăng');
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tạo bài đăng mới</h2>
        <Button
          icon={<EyeOutlined />}
          onClick={togglePreviewMode}
          className={previewMode ? 'bg-blue-500 text-white' : ''}
        >
          {previewMode ? 'Chế độ chỉnh sửa' : 'Xem trước'}
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
        className="space-y-6"
      >
        <Card title="Thông tin cơ bản" className="shadow-sm">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Tiêu đề bài đăng"
                name="title"
                rules={[
                  { required: true, message: 'Vui lòng nhập tiêu đề bài đăng' },
                  { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' }
                ]}
              >
                <Input
                  placeholder="VD: Cho thuê phòng trọ giá rẻ gần trường đại học..."
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Giá thuê (VNĐ/tháng)"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá thuê' }]}
              >
                <Input
                  placeholder="2,000,000"
                  min={100000}
                  max={50000000}
                  formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ''}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số người ở tối đa"
                name="maxOccupants"
                rules={[{ required: true, message: 'Vui lòng nhập số người ở tối đa' }]}
              >
                <Input
                  placeholder="2"
                  min={1}
                  max={10}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Địa chỉ và liên hệ" className="shadow-sm">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ chi tiết"
                name="address"
                rules={[
                  { required: true, message: 'Vui lòng nhập địa chỉ' },
                  { min: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự' }
                ]}
              >
                <TextArea
                  placeholder="VD: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                  rows={2}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại liên hệ"
                name="contactPhone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
                ]}
              >
                <Input
                  placeholder="0901234567"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email liên hệ (tùy chọn)"
                name="contactEmail"
                rules={[
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input
                  placeholder="email@example.com"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Hình ảnh" className="shadow-sm">
          <Form.Item
            label="Upload hình ảnh phòng trọ"
            name="images"
            rules={[{ required: true, message: 'Vui lòng upload ít nhất 1 hình ảnh' }]}
          >
            <ImageUpload
              maxFiles={10}
              accept="image/*"
            />
          </Form.Item>
        </Card>

        <Card title="Tiện ích" className="shadow-sm">
          <Form.Item
            label="Chọn các tiện ích có sẵn"
            name="amenities"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 tiện ích' }]}
          >
            <AmenitySelector />
          </Form.Item>
        </Card>

        <Card title="Thông tin chi tiết" className="shadow-sm">
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Form.Item
                label="Thông tin nhà trọ"
                name="roomInfo"
                rules={[
                  { required: true, message: 'Vui lòng nhập thông tin nhà trọ' },
                  { min: 20, message: 'Thông tin phải có ít nhất 20 ký tự' }
                ]}
              >
                <RichTextEditor
                  placeholder="Nhập thông tin chi tiết về nhà trọ (diện tích, nội thất, vị trí...)"
                  template={roomInfoTemplate}
                  height="200px"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Điều khoản thuê trọ"
                name="rentalTerms"
                rules={[
                  { required: true, message: 'Vui lòng nhập điều khoản thuê trọ' },
                  { min: 20, message: 'Điều khoản phải có ít nhất 20 ký tự' }
                ]}
              >
                <RichTextEditor
                  placeholder="Nhập các điều khoản thuê trọ (thời gian, thanh toán, quy định...)"
                  template={rentalTermsTemplate}
                  height="200px"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Chính sách cọc & hủy thuê"
                name="depositPolicy"
                rules={[
                  { required: true, message: 'Vui lòng nhập chính sách cọc & hủy thuê' },
                  { min: 20, message: 'Chính sách phải có ít nhất 20 ký tự' }
                ]}
              >
                <RichTextEditor
                  placeholder="Nhập chính sách về cọc, hoàn cọc và hủy thuê..."
                  template={depositPolicyTemplate}
                  height="200px"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Divider />

        <div className="flex justify-end !space-x-4">
          <Button
            size="large"
            onClick={() => form.resetFields()}
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            className="min-w-32"
          >
            Tạo bài đăng
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePostForm;