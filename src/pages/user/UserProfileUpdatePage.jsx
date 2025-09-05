import React, { useState } from 'react';
import { Select, Button, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const user = {
  name: 'Nguyễn Văn A',
  phone: '+84 123456789',
  type: 'pro',
  gender: 'male',
  dob: '+84 123456789',
  character: ['vui vẻ', 'hòa đồng']
};

// Mock data cho dropdown tính cách
const characterOptions = [
  'hướng nội',
  'hướng ngoại',
  'khéo léo',
  'tâm lành',
  'nói nhiều',
  'hoạt bát',
  'gần gũi',
  'vui vẻ',
  'hòa đồng'
];

const UserProfileUpdatePage = () => {
  const [selectedCharacters, setSelectedCharacters] = useState(user.character);
  const [isEditing, setIsEditing] = useState(false);

  const handleCharacterChange = (values) => {
    setSelectedCharacters(values);
  };

  const handleAddCharacter = (character) => {
    if (!selectedCharacters.includes(character)) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const handleRemoveCharacter = (characterToRemove) => {
    setSelectedCharacters(selectedCharacters.filter(char => char !== characterToRemove));
  };

  const handleSave = () => {
    // Logic save ở đây
    setIsEditing(false);
    console.log('Saved characters:', selectedCharacters);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Hồ sơ của tôi */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl">Hồ sơ của tôi</h2>
        <Button
          type="primary"
          ghost
          className="border-[#1890ff] text-[#1890ff] rounded-lg"
          onClick={() => setIsEditing(!isEditing)}
        >
          Chỉnh sửa
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex py-3 border-b border-gray-100">
          <span className="w-1/3 font-medium">Số điện thoại</span>
          <span className="w-2/3">{user.phone}</span>
        </div>
        <div className="flex py-3 border-b border-gray-100">
          <span className="w-1/3 font-medium">Họ và tên</span>
          <span className="w-2/3">{user.phone}</span>
        </div>
        <div className="flex py-3 border-b border-gray-100">
          <span className="w-1/3 font-medium">Ngày sinh</span>
          <span className="w-2/3">{user.phone}</span>
        </div>
        <div className="flex py-3 border-b border-gray-100">
          <span className="w-1/3 font-medium">Giới tính</span>
          <span className="w-2/3">{user.phone}</span>
        </div>
      </div>

      {/* Tính cách của tôi */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl">Tính cách của tôi</h2>
        <Button
          type="primary"
          className="bg-[#1890ff] border-[#1890ff] rounded-lg"
          onClick={handleSave}
        >
          Xác nhận
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-4 flex-wrap">
        {selectedCharacters.map((char, idx) => (
          <span
            key={idx}
            className="bg-[#1890ff] text-white rounded-full px-4 py-2 text-sm font-medium cursor-pointer hover:bg-red-500 transition-colors"
            onClick={() => handleRemoveCharacter(char)}
            title="Click để xóa"
          >
            {char}
          </span>
        ))}

        {/* Button thêm tính cách */}
        <Dropdown
          overlay={
            <Menu>
              {characterOptions
                .filter(option => !selectedCharacters.includes(option))
                .map(option => (
                  <Menu.Item key={option} onClick={() => handleAddCharacter(option)}>
                    {option}
                  </Menu.Item>
                ))}
            </Menu>
          }
          trigger={['click']}
          placement="bottomLeft"
        >
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="rounded-full border-gray-300 text-gray-500 hover:border-[#1890ff] hover:text-[#1890ff]"
            size="small"
          >
            Thêm
          </Button>
        </Dropdown>
      </div>

      {/* Dropdown selector với search */}
      <div className="relative hidden">
        <Select
          mode="multiple"
          placeholder="Tìm kiếm..."
          className="w-80"
          value={selectedCharacters}
          onChange={handleCharacterChange}
          options={characterOptions.map(option => ({
            label: option,
            value: option
          }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          maxTagCount={0}
          maxTagPlaceholder={() => ''}
        />
      </div>
    </div>
  );
};

export default UserProfileUpdatePage;
