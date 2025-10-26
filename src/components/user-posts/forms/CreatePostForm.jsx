import React, { useState, useEffect, useRef } from 'react';
import {
  Form, Input, Button, Upload, Select, message, Space,
  Row, Col, Card, Typography, Divider // Đã xóa Tabs, TabPane
} from 'antd';
import {
  UploadOutlined, SaveOutlined, CloseOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { postApi } from '../../../api/post.api';
import { furnitureApi } from '../../../api/furniture.api';
import { useNavigate } from 'react-router-dom';

// Sửa lại import: Lấy Title từ Typography
const { Title } = Typography;
const { Option } = Select;

const CreatePostForm = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Quill refs
  const descriptionRef = useRef(null);
  const conditionRef = useRef(null);
  const depositPolicyRef = useRef(null);
  const descriptionQuillRef = useRef(null);
  const conditionQuillRef = useRef(null);
  const depositPolicyQuillRef = useRef(null);

  // Load amenities on mount
  useEffect(() => {
    loadAmenities();
    initializeEditors();
  }, []);

  const loadAmenities = async () => {
    try {
      const response = await furnitureApi.getAllFurniture();
      setAmenities(response.data || []);
    } catch (error) {
      console.error('Error loading amenities:', error);
      message.error('Không thể tải danh sách tiện ích');
    }
  };

  const initializeEditors = () => {
    setTimeout(() => {
      // Description editor
      if (descriptionRef.current && !descriptionQuillRef.current) {
        descriptionQuillRef.current = new Quill(descriptionRef.current, {
          theme: 'snow',
          placeholder: 'Mô tả chi tiết về phòng trọ, tiện nghi, vị trí...',
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        });
        descriptionQuillRef.current.on('text-change', () => {
          const html = descriptionQuillRef.current.root.innerHTML;
          form.setFieldsValue({ description: html });
        });
      }

      // Condition editor
      if (conditionRef.current && !conditionQuillRef.current) {
        conditionQuillRef.current = new Quill(conditionRef.current, {
          theme: 'snow',
          placeholder: 'Mô tả tình trạng hiện tại của phòng, nội thất, thiết bị...',
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        });
        conditionQuillRef.current.on('text-change', () => {
          const html = conditionQuillRef.current.root.innerHTML;
          form.setFieldsValue({ condition: html });
        });
      }

      // Deposit Policy editor
      if (depositPolicyRef.current && !depositPolicyQuillRef.current) {
        depositPolicyQuillRef.current = new Quill(depositPolicyRef.current, {
          theme: 'snow',
          placeholder: 'Mô tả chính sách đặt cọc, hoàn cọc, thanh toán...',
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        });
        depositPolicyQuillRef.current.on('text-change', () => {
          const html = depositPolicyQuillRef.current.root.innerHTML;
          form.setFieldsValue({ depositPolicy: html });
        });
      }
    }, 100);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);
      const formData = new FormData();

      // Append text fields
      formData.append('Title', values.title);
      formData.append('Address', values.address);
      formData.append('Price', parseInt(values.price));
      formData.append('Description', values.description);
      formData.append('Condition', values.condition);
      formData.append('DepositPolicy', values.depositPolicy);

      // Append furnitureIds
      values.furnitureIds.forEach(id => formData.append('FurnitureIds', id));

      // Append images
      fileList.forEach((file) => {
        formData.append('Images', file);
      });

      const createPostResponse = await postApi.createPost(formData);
      if (createPostResponse.success) {
        message.success(createPostResponse.message || 'Tạo bài đăng thành công!');
        navigate(-1);
      }
    } catch (error) {
      if (error.errorFields) {
        // Validation error
        return;
      }
      console.log(error);
      message.error('Tạo bài đăng thất bại: ' + (error.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      form.setFieldsValue({ images: newFileList });
    },
    beforeUpload: (file) => {
      if (fileList.length >= 5) {
        message.error('Chỉ được upload tối đa 5 hình ảnh');
        return false;
      }
      const newFileList = [...fileList, file];
      setFileList(newFileList);
      form.setFieldsValue({ images: newFileList });
      return false; // Prevent auto upload
    },
    fileList,
    multiple: true,
    accept: 'image/*',
    maxCount: 5
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        Tạo bài đăng mới
      </Title>
      {/* Form của bạn đã là layout="vertical" */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* --- CARD 1: NỘI DUNG CHÍNH --- */}
        <Card title="Nội dung chính" bordered={false} style={{ marginBottom: 24 }}>
          <Form.Item
            label="Tiêu đề bài đăng"
            name="title"
            rules={[
              { required: true, message: 'Vui lòng nhập tiêu đề bài đăng' },
              { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' }
            ]}
          >
            <Input placeholder="Ví dụ: Phòng trọ cao cấp gần Đại học Kinh tế" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              { min: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự' }
            ]}
          >
            <Input placeholder="Nhập địa chỉ phòng trọ (số nhà, đường, phường, quận...)" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả' },
              { min: 20, message: 'Mô tả phải có ít nhất 20 ký tự' }
            ]}
          >
            <div ref={descriptionRef} style={{ minHeight: '250px' }} />
          </Form.Item>
        </Card>

        {/* --- CARD 2: GIÁ & TIỆN ÍCH --- */}
        <Card title="Giá & Tiện ích" bordered={false} style={{ marginBottom: 24 }}>
          <Form.Item
            label="Giá thuê (VNĐ/tháng)"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá thuê' },
              { pattern: /^\d+$/, message: 'Giá thuê phải là số nguyên dương' },
              {
                validator: (_, value) => {
                  if (value && parseInt(value) <= 0) {
                    return Promise.reject('Giá thuê phải lớn hơn 0');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input prefix={<DollarCircleOutlined />} placeholder="Ví dụ: 3000000" />
          </Form.Item>

          <Form.Item
            label="Tiện ích và nội thất"
            name="furnitureIds"
            rules={[
              { required: true, message: 'Vui lòng chọn ít nhất 1 tiện ích hoặc nội thất' },
              { type: 'array', min: 1, message: 'Vui lòng chọn ít nhất 1 tiện ích hoặc nội thất' }
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Chọn các tiện ích có sẵn"
            >
              {amenities.map((item) => (
                <Option key={item.furId} value={item.furId}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>

        {/* --- CARD 3: HÌNH ẢNH & ĐIỀU KHOẢN --- */}
        <Card title="Hình ảnh & Điều khoản" bordered={false} style={{ marginBottom: 24 }}>
          <Form.Item
            label="Hình ảnh (Tối đa 5 ảnh)"
            name="images" // Vẫn giữ 'name' để form.validateFields() có thể tìm thấy
            // Bỏ 'required' ở đây
            rules={[
              {
                // Sử dụng một validator tùy chỉnh duy nhất
                validator: () => {
                  // Validator này sẽ kiểm tra trực tiếp React state 'fileList'
                  if (fileList.length < 1) {
                    return Promise.reject(new Error('Vui lòng upload ít nhất 1 hình ảnh'));
                  }
                  if (fileList.length > 5) {
                    return Promise.reject(new Error('Chỉ được upload tối đa 5 hình ảnh'));
                  }
                  // Nếu không có lỗi, cho qua
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Bấm để chọn ảnh</Button>
            </Upload>
            {/* Giữ lại phần hiển thị số lượng file */}
            <div style={{ marginTop: 8 }}>
              Đã chọn {fileList.length} hình ảnh (tối đa 5)
            </div>
          </Form.Item>

          <Divider />

          <Form.Item
            label="Tình trạng"
            name="condition"
            rules={[
              { required: true, message: 'Vui lòng nhập tình trạng' },
              { min: 20, message: 'Tình trạng phải có ít nhất 20 ký tự' }
            ]}
          >
            <div ref={conditionRef} style={{ minHeight: '150px' }} />
          </Form.Item>

          <Form.Item
            label="Chính sách cọc"
            name="depositPolicy"
            rules={[
              { required: true, message: 'Vui lòng nhập chính sách cọc' },
              { min: 20, message: 'Chính sách phải có ít nhất 20 ký tự' }
            ]}
          >
            <div ref={depositPolicyRef} style={{ minHeight: '150px' }} />
          </Form.Item>
        </Card>

        {/* --- NÚT SUBMIT --- */}
        <Card bordered={false}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ float: 'right' }}>
              <Button
                icon={<CloseOutlined />}
                onClick={() => navigate(-1)}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                Tạo bài đăng
              </Button>
            </Space>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default CreatePostForm;