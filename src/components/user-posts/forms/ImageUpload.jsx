import React, { useState } from 'react';
import { Upload, Image, Button, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ImageUpload = ({ value = [], onChange, maxCount = 10 }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    onChange?.(newFileList);
  };

  const handleRemove = (file) => {
    const newFileList = value.filter(item => item.uid !== file.uid);
    onChange?.(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể upload file JPG/PNG/WEBP!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Hình ảnh phải nhỏ hơn 5MB!');
    }
    return false; // Prevent auto upload
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center py-4">
      <PlusOutlined className="text-2xl text-gray-400 mb-2" />
      <div className="text-gray-600 text-sm">Thêm hình ảnh</div>
      <div className="text-gray-400 text-xs mt-1">Tối đa {maxCount} ảnh</div>
    </div>
  );

  const customItemRender = (originNode, file) => {
    return (
      <div className="relative group">
        {originNode}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="text-white hover:text-red-300"
            onClick={() => handleRemove(file)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Upload
        listType="picture-card"
        fileList={value}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        className="image-upload-grid"
        itemRender={customItemRender}
      >
        {value.length >= maxCount ? null : uploadButton}
      </Upload>

      <Image
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: previewVisible,
          onVisibleChange: setPreviewVisible,
          afterOpenChange: (visible) => !visible && setPreviewVisible(false),
        }}
        src={previewImage}
      />

      {value.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          Đã chọn {value.length}/{maxCount} ảnh
        </div>
      )}

      <style jsx>{`
        .image-upload-grid :global(.ant-upload-select) {
          width: 120px !important;
          height: 120px !important;
          border: 2px dashed #d9d9d9 !important;
          border-radius: 8px !important;
        }
        .image-upload-grid :global(.ant-upload-list-picture-card-container) {
          width: 120px !important;
          height: 120px !important;
        }
        .image-upload-grid :global(.ant-upload-list-picture-card .ant-upload-list-item) {
          width: 120px !important;
          height: 120px !important;
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  maxCount: PropTypes.number,
};

export default ImageUpload;