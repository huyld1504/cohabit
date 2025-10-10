import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Tag, Space, Divider, Checkbox, Spin } from 'antd';
import { toast } from 'react-toastify';
import { profileApi } from '../../api/profile.api';
import { characteristicApi } from '../../api/characteristic.api';

const UpdateCharacteristicsModal = ({ open, onClose, userCharacteristics, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingCharacteristics, setLoadingCharacteristics] = useState(false);
  const [selectedCharacteristicIds, setSelectedCharacteristicIds] = useState([]);
  const [availableCharacteristics, setAvailableCharacteristics] = useState([]);

  useEffect(() => {
    if (open) {
      loadAvailableCharacteristics();
    }
  }, [open]);

  // Separate useEffect to handle setting selected characteristics after both modal opens and characteristics are loaded
  useEffect(() => {
    if (open && availableCharacteristics.length > 0 && userCharacteristics) {
      setInitialSelectedCharacteristics();
    }
  }, [open, availableCharacteristics, userCharacteristics]);

  const loadAvailableCharacteristics = async () => {
    try {
      setLoadingCharacteristics(true);
      const response = await characteristicApi.getAllCharacteristics();

      if (response?.success && response?.data && Array.isArray(response.data)) {
        setAvailableCharacteristics(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading characteristics:', error);
      toast.error('Không thể tải danh sách tính cách. Vui lòng thử lại!');
    } finally {
      setLoadingCharacteristics(false);
    }
  };

  const setInitialSelectedCharacteristics = () => {
    if (!userCharacteristics || !Array.isArray(userCharacteristics)) {
      setSelectedCharacteristicIds([]);
      return;
    }

    const userCharacteristicIds = userCharacteristics.map(userChar => {
      // If userChar is already an ID (starts with 'C'), use it directly
      if (typeof userChar === 'string' && userChar.startsWith('C')) {
        return userChar;
      }

      // If userChar is an object with id property, use the id
      if (typeof userChar === 'object' && userChar?.id) {
        return userChar.id;
      }

      // If userChar is a title string, find the corresponding ID
      if (typeof userChar === 'string') {
        const foundChar = availableCharacteristics.find(char => char.title === userChar);
        return foundChar ? foundChar.id : null;
      }

      return null;
    }).filter(Boolean); // Remove null values

    console.log('Setting initial selected characteristics:', userCharacteristicIds);
    setSelectedCharacteristicIds(userCharacteristicIds);
  };

  const handleCharacteristicToggle = (characteristicId) => {
    if (selectedCharacteristicIds.includes(characteristicId)) {
      // Remove from selection
      const updatedIds = selectedCharacteristicIds.filter(id => id !== characteristicId);
      setSelectedCharacteristicIds(updatedIds);

      const characteristic = availableCharacteristics.find(char => char.id === characteristicId);
      toast.info(`Đã bỏ chọn: ${characteristic?.title}`);
    } else {
      // Add to selection (max 10)
      if (selectedCharacteristicIds.length >= 10) {
        toast.warning('Chỉ được chọn tối đa 10 tính cách!');
        return;
      }

      const updatedIds = [...selectedCharacteristicIds, characteristicId];
      setSelectedCharacteristicIds(updatedIds);

      const characteristic = availableCharacteristics.find(char => char.id === characteristicId);
      toast.success(`Đã chọn: ${characteristic?.title}`);
    }
  };

  const handleSelectAll = () => {
    if (selectedCharacteristicIds.length === availableCharacteristics.length) {
      // Deselect all
      setSelectedCharacteristicIds([]);
      toast.info('Đã bỏ chọn tất cả tính cách');
    } else {
      // Select all (limit to 10)
      const allIds = availableCharacteristics.slice(0, 10).map(char => char.id);
      setSelectedCharacteristicIds(allIds);
      toast.success(`Đã chọn ${allIds.length} tính cách`);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Send array of characteristic IDs as API expects
      const response = await profileApi.updateCharacteristics(selectedCharacteristicIds);

      console.log('Update characteristics response:', response);

      // Handle response - expecting string: "User characteristics updated successfully."
      if (response === "User characteristics updated successfully." || response?.message === "User characteristics updated successfully.") {
        toast.success('Cập nhật tính cách thành công!');

        // Convert IDs back to titles for display in parent component
        const selectedTitles = selectedCharacteristicIds.map(id => {
          const characteristic = availableCharacteristics.find(char => char.id === id);
          return characteristic ? characteristic.title : id;
        });

        onUpdateSuccess && onUpdateSuccess(selectedTitles);
        handleClose();
      } else if (response?.success) {
        toast.success('Cập nhật tính cách thành công!');

        const selectedTitles = selectedCharacteristicIds.map(id => {
          const characteristic = availableCharacteristics.find(char => char.id === id);
          return characteristic ? characteristic.title : id;
        });

        onUpdateSuccess && onUpdateSuccess(selectedTitles);
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
    setSelectedCharacteristicIds([]);
    setAvailableCharacteristics([]);
    onClose();
  };

  const getSelectedCharacteristics = () => {
    return availableCharacteristics.filter(char => selectedCharacteristicIds.includes(char.id));
  };

  return (
    <Modal
      title="Cập nhật tính cách của tôi"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <div className="space-y-6">
        {loadingCharacteristics ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
            <span className="ml-3">Đang tải danh sách tính cách...</span>
          </div>
        ) : (
          <>
            {/* Available Characteristics Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Chọn tính cách của bạn ({selectedCharacteristicIds.length}/10)
                </label>
                <Button
                  type="text"
                  size="small"
                  onClick={handleSelectAll}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {selectedCharacteristicIds.length === availableCharacteristics.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 p-4 rounded-lg">
                {availableCharacteristics.map((characteristic) => (
                  <div
                    key={characteristic.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedCharacteristicIds.includes(characteristic.id)
                        ? 'bg-blue-50 border-blue-300 shadow-sm'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleCharacteristicToggle(characteristic.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCharacteristicIds.includes(characteristic.id)}
                        onChange={() => handleCharacteristicToggle(characteristic.id)}
                        className="pointer-events-none"
                      />
                      <span className={`text-sm font-medium ${
                        selectedCharacteristicIds.includes(characteristic.id) ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {characteristic.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {availableCharacteristics.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Không có tính cách nào để chọn
                </div>
              )}
            </div>

            <Divider />

            {/* Selected Characteristics Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tính cách đã chọn ({selectedCharacteristicIds.length}/10)
              </label>

              {selectedCharacteristicIds.length > 0 ? (
                <div className="space-y-2">
                  <Space size={[0, 8]} wrap>
                    {getSelectedCharacteristics().map((characteristic) => (
                      <Tag
                        key={characteristic.id}
                        closable
                        onClose={() => handleCharacteristicToggle(characteristic.id)}
                        color="blue"
                        className="text-sm px-3 py-1 cursor-pointer"
                      >
                        {characteristic.title}
                      </Tag>
                    ))}
                  </Space>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-lg mb-2">Chưa chọn tính cách nào</div>
                  <div className="text-sm">Hãy chọn tính cách mô tả về bạn ở phía trên</div>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">
              💡 Chọn những tính cách mô tả đúng nhất về bạn để tìm được người bạn cùng phòng phù hợp
            </div>
          </>
        )}

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
            disabled={selectedCharacteristicIds.length === 0 || loadingCharacteristics}
          >
            Cập nhật ({selectedCharacteristicIds.length})
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateCharacteristicsModal;
