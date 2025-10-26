import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Button, Space, message } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { postApi } from '../../api/post.api';

const { TextArea } = Input;

const EditPostModal = ({ visible, onCancel, post, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [descriptionData, setDescriptionData] = useState('');
  const [conditionData, setConditionData] = useState('');
  const [depositPolicyData, setDepositPolicyData] = useState('');
  const descriptionRef = useRef(null);
  const conditionRef = useRef(null);
  const depositPolicyRef = useRef(null);
  const descriptionQuillRef = useRef(null);
  const conditionQuillRef = useRef(null);
  const depositPolicyQuillRef = useRef(null);

  useEffect(() => {
    if (visible && post) {
      const desc = post.description || '';
      const cond = post.condition || '';
      const policy = post.depositPolicy || '';

      // Set form values when modal opens
      form.setFieldsValue({
        title: post.title,
        address: post.address,
        price: post.price,
        description: desc,
        condition: cond,
        depositPolicy: policy
      });

      // Set editor data states
      setDescriptionData(desc);
      setConditionData(cond);
      setDepositPolicyData(policy);

      // Initialize Quill editors after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (descriptionRef.current && !descriptionQuillRef.current && !descriptionRef.current.querySelector('.ql-toolbar')) {
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
          descriptionQuillRef.current.root.innerHTML = desc;
          descriptionQuillRef.current.on('text-change', () => {
            const html = descriptionQuillRef.current.root.innerHTML;
            setDescriptionData(html);
            form.setFieldsValue({ description: html });
          });
        }

        if (conditionRef.current && !conditionQuillRef.current && !conditionRef.current.querySelector('.ql-toolbar')) {
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
          conditionQuillRef.current.root.innerHTML = cond;
          conditionQuillRef.current.on('text-change', () => {
            const html = conditionQuillRef.current.root.innerHTML;
            setConditionData(html);
            form.setFieldsValue({ condition: html });
          });
        }

        if (depositPolicyRef.current && !depositPolicyQuillRef.current && !depositPolicyRef.current.querySelector('.ql-toolbar')) {
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
          depositPolicyQuillRef.current.root.innerHTML = policy;
          depositPolicyQuillRef.current.on('text-change', () => {
            const html = depositPolicyQuillRef.current.root.innerHTML;
            setDepositPolicyData(html);
            form.setFieldsValue({ depositPolicy: html });
          });
        }
      }, 100);
    } else if (!visible) {
      // Reset when modal closes
      setDescriptionData('');
      setConditionData('');
      setDepositPolicyData('');

      // Destroy Quill instances
      if (descriptionQuillRef.current && typeof descriptionQuillRef.current.destroy === 'function') {
        descriptionQuillRef.current.destroy();
        descriptionQuillRef.current = null;
      }
      if (conditionQuillRef.current && typeof conditionQuillRef.current.destroy === 'function') {
        conditionQuillRef.current.destroy();
        conditionQuillRef.current = null;
      }
      if (depositPolicyQuillRef.current && typeof depositPolicyQuillRef.current.destroy === 'function') {
        depositPolicyQuillRef.current.destroy();
        depositPolicyQuillRef.current = null;
      }
    }
  }, [visible, post, form]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (descriptionQuillRef.current && typeof descriptionQuillRef.current.destroy === 'function') {
        descriptionQuillRef.current.destroy();
        descriptionQuillRef.current = null;
      }
      if (conditionQuillRef.current && typeof conditionQuillRef.current.destroy === 'function') {
        conditionQuillRef.current.destroy();
        conditionQuillRef.current = null;
      }
      if (depositPolicyQuillRef.current && typeof depositPolicyQuillRef.current.destroy === 'function') {
        depositPolicyQuillRef.current.destroy();
        depositPolicyQuillRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await postApi.updatePostInfo(post.postId, {
        title: values.title,
        address: values.address,
        price: values.price,
        description: values.description,
        condition: values.condition,
        depositPolicy: values.depositPolicy
      });

      if (response.success) {
        message.success('Cập nhật bài đăng thành công!');
        onSuccess?.();
        onCancel();
      } else {
        message.error('Cập nhật bài đăng thất bại!');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('Có lỗi xảy ra khi cập nhật bài đăng!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setDescriptionData('');
    setConditionData('');
    setDepositPolicyData('');

    // Destroy Quill instances
    if (descriptionQuillRef.current) {
      descriptionQuillRef.current = null;
    }
    if (conditionQuillRef.current) {
      conditionQuillRef.current = null;
    }
    if (depositPolicyQuillRef.current) {
      depositPolicyQuillRef.current = null;
    }

    onCancel();
  };

  return (
    <Modal
      title="Chỉnh sửa thông tin bài đăng"
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={null}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tiêu đề bài đăng"
              name="title"
              rules={[
                { required: true, message: 'Vui lòng nhập tiêu đề' },
                { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' },
                { max: 200, message: 'Tiêu đề không được vượt quá 200 ký tự' }
              ]}
            >
              <Input placeholder="Nhập tiêu đề bài đăng" />
            </Form.Item>

            <Form.Item
              label="Giá thuê (VNĐ/tháng)"
              name="price"
              rules={[
                { required: true, message: 'Vui lòng nhập giá thuê' },
                { type: 'number', min: 100000, message: 'Giá thuê phải từ 100,000 VNĐ' },
                { type: 'number', max: 50000000, message: 'Giá thuê không được vượt quá 50,000,000 VNĐ' }
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Ví dụ: 3000000"
                formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ''}
                min={100000}
                max={50000000}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              { min: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự' }
            ]}
          >
            <TextArea
              placeholder="Nhập địa chỉ chi tiết của phòng trọ"
              rows={3}
            />
          </Form.Item>

          {/* Rich Text Fields */}
          <Form.Item
            label="Mô tả chi tiết"
            name="description"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả' },
              { min: 20, message: 'Mô tả phải có ít nhất 20 ký tự' }
            ]}
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div ref={descriptionRef} style={{ minHeight: '200px' }}></div>
            </div>
          </Form.Item>

          <Form.Item
            label="Tình trạng phòng"
            name="condition"
            rules={[
              { required: true, message: 'Vui lòng nhập tình trạng phòng' },
              { min: 20, message: 'Tình trạng phải có ít nhất 20 ký tự' }
            ]}
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div ref={conditionRef} style={{ minHeight: '200px' }}></div>
            </div>
          </Form.Item>

          <Form.Item
            label="Chính sách đặt cọc"
            name="depositPolicy"
            rules={[
              { required: true, message: 'Vui lòng nhập chính sách đặt cọc' },
              { min: 20, message: 'Chính sách phải có ít nhất 20 ký tự' }
            ]}
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div ref={depositPolicyRef} style={{ minHeight: '200px' }}></div>
            </div>
          </Form.Item>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <Space>
            <Button onClick={handleCancel} icon={<CloseOutlined />}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
            >
              Cập nhật
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default EditPostModal;