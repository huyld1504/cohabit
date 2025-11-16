import React, { useState, useEffect } from 'react';
import { Button, message, Spin, Tooltip } from 'antd';
import { EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { orderApi } from '../../api/order.api';
import { riverSunsetCity } from '../../assets';

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load order history on mount
  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getHistoryPosts();
        console.log('Order History Response:', response);

        if (response.success && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error loading order history:', error);
        message.error('Không thể tải lịch sử thuê. Vui lòng thử lại!');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, []);

  const handleViewDetails = (postId) => {
    window.location.href = `/properties/${postId}`;
  };

  const handleContact = (conversationId) => {
    window.location.href = `/chat?conversationId=${conversationId}`;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Lịch sử thuê
        </h2>
      </div>

      {orders.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Chưa có lịch sử thuê nào
          </h3>
          <p className="text-gray-500">
            Hãy bắt đầu tìm kiếm phòng trọ phù hợp với bạn!
          </p>
        </div>
      ) : (
        /* Orders List */
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    <img
                      alt={order.postTitle}
                      src={riverSunsetCity}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-gray-900 mb-2 truncate">
                      {order.postTitle}
                    </h3>

                    <div className="flex items-start text-gray-500 text-sm mb-2">
                      <svg className="w-4 h-4 mt-0.5 mr-1.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="line-clamp-2">{order.postAddress}</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Liên hệ bởi: {order.userName}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Tooltip title="Xem chi tiết bài đăng" placement="top">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<EyeOutlined className="text-xl !text-blue-500" />}
                          onClick={() => handleViewDetails(order.postId)}
                          className="hover:bg-blue-50 transition-all duration-200 hover:scale-105 flex items-center justify-center w-10 h-10 min-w-0 p-0 border border-blue-200"
                        />
                      </Tooltip>

                      <Tooltip title="Liên hệ ngay" placement="top">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<MessageOutlined className="text-xl !text-green-500" />}
                          onClick={() => handleContact(order.conversationId)}
                          className="hover:bg-green-50 transition-all duration-200 hover:scale-105 flex items-center justify-center w-10 h-10 min-w-0 p-0 border border-green-200"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;