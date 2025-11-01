import React from 'react';
import { Card, Button } from 'antd';
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';

const ContractCard = ({ title, description, driveLink, icon }) => {
  const handleOpenDocument = () => {
    if (driveLink) {
      window.open(driveLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      className="contract-card bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col"
      bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className="flex flex-col h-full">
        {/* Icon and Title */}
        <div className="flex items-center mb-4">
          <div className="bg-blue-50 rounded-full p-3 mr-4">
            {icon || <FileTextOutlined className="text-blue-500 text-2xl" />}
          </div>
          <h3 className="font-semibold text-lg text-gray-900 flex-1 leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-6 flex-1">
            {description}
          </p>
        )}

        {/* Action Button */}
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-md w-full"
          size="large"
          onClick={handleOpenDocument}
          disabled={!driveLink}
        >
          {driveLink ? 'Xem tài liệu' : 'Chưa có liên kết'}
        </Button>
      </div>
    </Card>
  );
};

export default ContractCard;
