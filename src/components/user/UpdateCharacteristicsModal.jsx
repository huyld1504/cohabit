import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Tag, Space, Divider } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { profileApi } from '../../api/profile.api';

const UpdateCharacteristicsModal = ({ open, onClose, userCharacteristics, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (open) {
      // Set initial selected characteristics from user data
      if (userCharacteristics && Array.isArray(userCharacteristics)) {
        setSelectedCharacteristics([...userCharacteristics]);
      } else {
        setSelectedCharacteristics([]);
      }
    }
  }, [open, userCharacteristics]);

  const handleAddCharacteristic = () => {
    const newCharacteristic = inputValue.trim();

    if (!newCharacteristic) {
      toast.warning('Vui lòng nhập tính cách!');
      return;
    }

    if (selectedCharacteristics.includes(newCharacteristic)) {
      toast.warning('Tính cách này đã tồn tại!');
      return;
    }

    if (selectedCharacteristics.length >= 10) {
      toast.warning('Chỉ được chọn tối đa 10 tính cách!');
      return;
    }

    setSelectedCharacteristics([...selectedCharacteristics, newCharacteristic]);
    setInputValue('');
    toast.success(`Đã thêm tính cách: ${newCharacteristic}`);
  };

  const handleRemoveCharacteristic = (characteristicToRemove) => {
    const updatedCharacteristics = selectedCharacteristics.filter(
      char => char !== characteristicToRemove
    );
    setSelectedCharacteristics(updatedCharacteristics);
    toast.info(`Đã xóa tính cách: ${characteristicToRemove}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCharacteristic();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Send array of strings directly as API expects
      const response = await profileApi.updateCharacteristics(selectedCharacteristics);

      console.log('Update characteristics response:', response);

      // Handle response - expecting string: "User characteristics updated successfully."
      if (response === "User characteristics updated successfully." || response?.message === "User characteristics updated successfully.") {
        toast.success('Cập nhật tính cách thành công!');
        onUpdateSuccess && onUpdateSuccess(selectedCharacteristics);
        handleClose();
      } else if (Array.isArray(response)) {
        // Fallback: if response is array format
        toast.success('Cập nhật tính cách thành công!');
        onUpdateSuccess && onUpdateSuccess(response);
        handleClose();
      } else if (response?.success) {
        // Fallback: if response has success property
        toast.success('Cập nhật tính cách thành công!');
        onUpdateSuccess && onUpdateSuccess(selectedCharacteristics);
        handleClose();
      } else {
        throw new Error('Có lỗi xảy ra khi cập nhật tính cách');
      }
    } catch (error) {
      console.error('Error updating characteristics:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi cập nhật tính cách. Vui lòng thử lại!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedCharacteristics([]);
    setInputValue('');
    onClose();
  };

  return (
    <Modal
      title="Cập nhật tính cách của tôi"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={700}
      destroyOnClose
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thêm tính cách mới
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập tính cách của bạn (ví dụ: Thân thiện, Gọn gàng, Yên tĩnh...)"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              size="large"
              maxLength={20}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCharacteristic}
              size="large"
              className="!bg-[#1279a2]"
              disabled={!inputValue.trim() || selectedCharacteristics.length >= 10}
            >
              Add
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            💡 Nhập tính cách và nhấn Enter hoặc click Add để thêm vào danh sách
          </div>
        </div>

        <Divider />

        {/* Selected Characteristics Display */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Tính cách đã chọn ({selectedCharacteristics.length}/10)
            </label>
            {selectedCharacteristics.length > 0 && (
              <Button
                type="text"
                size="small"
                onClick={() => setSelectedCharacteristics([])}
                className="text-red-500 hover:text-red-700"
              >
                Xóa tất cả
              </Button>
            )}
          </div>

          {selectedCharacteristics.length > 0 ? (
            <div className="space-y-2">
              <Space size={[0, 8]} wrap>
                {selectedCharacteristics.map((characteristic, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveCharacteristic(characteristic)}
                    color="blue"
                    className="text-sm px-3 py-1 cursor-pointer"
                  >
                    {characteristic}
                  </Tag>
                ))}
              </Space>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-lg mb-2">Chưa có tính cách nào</div>
              <div className="text-sm">Hãy thêm tính cách mô tả về bạn ở phía trên</div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gợi ý tính cách phổ biến
          </label>
          <Space size={[0, 8]} wrap>
            {[
              'Thân thiện', 'Vui vẻ', 'Hòa đồng', 'Yên tĩnh', 'Gọn gàng',
              'Sạch sẽ', 'Chia sẻ', 'Tôn trọng', 'Linh hoạt', 'Chính trực'
            ].map((suggestion) => (
              <Tag
                key={suggestion}
                className={`cursor-pointer transition-colors ${
                  selectedCharacteristics.includes(suggestion)
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (!selectedCharacteristics.includes(suggestion) && selectedCharacteristics.length < 10) {
                    setSelectedCharacteristics([...selectedCharacteristics, suggestion]);
                    toast.success(`Đã thêm: ${suggestion}`);
                  }
                }}
              >
                + {suggestion}
              </Tag>
            ))}
          </Space>
          <div className="text-xs text-gray-500 mt-2">
            💡 Click vào các gợi ý để thêm nhanh vào danh sách của bạn
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button onClick={handleClose} size="large">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
            className="!bg-[#1279a2]"
            disabled={selectedCharacteristics.length === 0}
          >
            Cập nhật ({selectedCharacteristics.length})
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateCharacteristicsModal;
