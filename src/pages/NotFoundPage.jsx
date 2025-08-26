import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trang không tìm thấy
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 left-8 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute top-12 right-12 w-3 h-3 bg-orange-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 py-6 h-auto"
          >
            <Link to="/" className="text-white no-underline">
              Về trang chủ
            </Link>
          </Button>

          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            className="border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 px-8 py-6 h-auto"
          >
            Quay lại
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ? Liên hệ với chúng tôi qua{' '}
            <a href="mailto:support@cohabit.vn" className="text-blue-600 hover:text-blue-700 underline">
              support@cohabit.vn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;