import React from 'react';

const user = {
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  type: 'pro',
  gender: 'male',
  dob: '1990-01-01',
  character: ['vui vẻ', 'hòa đồng']
};

const UserSettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Hồ sơ của tôi */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-3xl">Hồ sơ của tôi</h2>
        <button className="border border-[#1279a2] text-[#04537c] rounded-lg px-4 py-1 hover:bg-[#f0f8ff] cursor-pointer">Chỉnh sửa</button>
      </div>
      <div className="divide-y">
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Số điện thoại</span>
          <span className="w-2/3 text-lg">{user.phone}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Họ và tên</span>
          <span className="w-2/3 text-lg">{user.name}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Ngày sinh</span>
          <span className="w-2/3 text-lg">{user.dob}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-1/3 font-medium text-lg">Giới tính</span>
          <span className="w-2/3 text-lg">{user.gender === 'male' ? 'Nam' : 'Nữ'}</span>
        </div>
      </div>

      {/* Tính cách của tôi */}
      <div className="flex items-center justify-between mt-8 mb-2">
        <h2 className="font-bold text-3xl">Tính cách của tôi</h2>
        <button className="border border-[#1279a2] text-[#04537c] rounded-lg px-4 py-1 hover:bg-[#f0f8ff] cursor-pointer">Chỉnh sửa</button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {user.character.map((char, idx) => (
          <span key={idx} className="bg-[#1279a2] text-white rounded-full px-5 py-2 text-lg font-semibold">{char}</span>
        ))}
      </div>
    </div>
  );
};

export default UserSettingsPage;