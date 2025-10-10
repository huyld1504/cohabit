import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { profileApi } from '../../api/profile.api';

const { Option } = Select;

const UpdateProfileModal = ({ open, onClose, userProfile, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (open && userProfile) {
      // Set form values when modal opens - handle different data structures
      const initialValues = {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        birthdate: userProfile.yob ? dayjs(`${userProfile.yob}-01-01`) : null,
        sex: userProfile.sex,
      };

      // If firstName/lastName not available, try to split fullName
      if (!userProfile.firstName && !userProfile.lastName && userProfile.fullName) {
        const nameParts = userProfile.fullName.trim().split(' ');
        if (nameParts.length >= 2) {
          initialValues.firstName = nameParts.slice(0, -1).join(' '); // All but last word as firstName
          initialValues.lastName = nameParts[nameParts.length - 1]; // Last word as lastName
        } else if (nameParts.length === 1) {
          initialValues.lastName = nameParts[0]; // Single name goes to lastName
        }
      }

      form.setFieldsValue(initialValues);
      setImageUrl(userProfile.image || userProfile.avatar || null);
    }
  }, [open, userProfile, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Prepare data for API
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        yob: values.birthdate ? values.birthdate.year().toString() : '',
        sex: values.sex, // Keep original value from form without parsing
        image: '' // Set to empty string as requested
      };

      const response = await profileApi.updateProfile(updateData);
      console.log(response);

      // Handle the actual response format - just a simple message string
      if (response === "Profile updated successfully." || response?.message === "Profile updated successfully." || response?.success) {
        toast.success('Cập nhật hồ sơ thành công!');
        onUpdateSuccess && onUpdateSuccess(response);
        handleClose();
      } else {
        // If response is not the expected success message, treat as error
        throw new Error(response?.message || response || 'Có lỗi xảy ra khi cập nhật hồ sơ');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setImageUrl(null);
    onClose();
  };

  const getSexLabel = (sex) => {
    switch (sex) {
      case 1: return 'Male';
      case 2: return 'Female';
      case 3: return 'Other';
      default: return 'Not specified';
    }
  };

  return (
    <Modal
      title="Cập nhật hồ sơ"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Họ"
            name="firstName"
            rules={[
              { required: true, message: 'Vui lòng nhập họ!' },
              { max: 50, message: 'Họ không được quá 50 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập họ của bạn" size="large" />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="lastName"
            rules={[
              { required: true, message: 'Vui lòng nhập tên!' },
              { max: 50, message: 'Tên không được quá 50 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên của bạn" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Ngày sinh"
          name="birthdate"
          rules={[
            { required: true, message: 'Vui lòng chọn ngày sinh!' },
            {
              validator: (_, value) => {
                if (value) {
                  const age = dayjs().diff(value, 'year');
                  if (age < 16) {
                    return Promise.reject(new Error('Bạn phải ít nhất 16 tuổi!'));
                  }
                  if (age > 100) {
                    return Promise.reject(new Error('Tuổi không hợp lệ!'));
                  }
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <DatePicker
            placeholder="Chọn ngày sinh"
            size="large"
            className="w-full"
            format="DD/MM/YYYY"
            disabledDate={(current) => {
              // Disable future dates and dates more than 100 years ago
              const today = dayjs();
              const hundredYearsAgo = dayjs().subtract(100, 'year');
              return current && (current > today || current < hundredYearsAgo);
            }}
            showToday={false}
          />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="sex"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
        >
          <Select placeholder="Chọn giới tính" size="large">
            <Option value={'Male'}>Male</Option>
            <Option value={'Female'}>Female</Option>
            <Option value={'Other'}>Other</Option>
          </Select>
        </Form.Item>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={handleClose} size="large">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="!bg-[#1279a2]"
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateProfileModal;
