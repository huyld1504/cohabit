import React, { useState, useEffect } from 'react';
import { Spin, Empty, Row, Col } from 'antd';
import RentedPostCard from './RentedPostCard';

const RentedPostsList = () => {
  const [rentedPosts, setRentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real API call
  useEffect(() => {
    const fetchRentedPosts = async () => {
      try {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockData = [
          {
            id: 1,
            title: 'Phòng trọ 20m² gần ĐH Bách Khoa',
            price: 2500000,
            address: 'Hẻm 494 CMT8, P.11, Q.3, TP.HCM',
            image: '/images/room1.jpg',
            renter: {
              name: 'Nguyễn Văn A',
              phone: '0901234567',
              message: 'Tôi cần thuê phòng để ở thể gia đình vào tuần sau.',
            },
            rentStartDate: '2024-12-07T00:00:00.000Z',
          },
          {
            id: 2,
            title: 'Căn hộ mini 25m² full nội thất',
            price: 3200000,
            address: '123 Lê Văn Sỹ, P.14, Q.3, TP.HCM',
            image: '/images/room2.jpg',
            renter: {
              name: 'Trần Thị B',
              phone: '0907654321',
              message: 'Em muốn thuê phòng ở lâu dài, có thể gia hạn hợp đồng.',
            },
            rentStartDate: '2024-11-15T00:00:00.000Z',
          },
          {
            id: 3,
            title: 'Phòng studio 30m² view đẹp',
            price: 4500000,
            address: '456 Nguyễn Trãi, P.8, Q.5, TP.HCM',
            image: '/images/room3.jpg',
            renter: {
              name: 'Lê Minh C',
              phone: '0912345678',
              message: 'Anh cần phòng để ở một mình, yên tĩnh để làm việc.',
            },
            rentStartDate: '2024-10-20T00:00:00.000Z',
          }
        ];

        setRentedPosts(mockData);
      } catch (error) {
        console.error('Error fetching rented posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (rentedPosts.length === 0) {
    return (
      <div className="py-12">
        <Empty
          description={
            <span className="text-gray-500">
              Chưa có bài đăng nào được thuê
            </span>
          }
          className="text-gray-500"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Row gutter={[0, 16]}>
        {rentedPosts.map((post) => (
          <Col span={24} key={post.id}>
            <RentedPostCard post={post} />
          </Col>
        ))}
      </Row>

      {/* Stats */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700">
            Tổng bài đăng đã cho thuê:
          </span>
          <span className="text-blue-600 font-semibold">
            {rentedPosts.length} bài đăng
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-700">
            Tổng doanh thu ước tính/tháng:
          </span>
          <span className="text-green-600 font-semibold">
            {new Intl.NumberFormat('vi-VN').format(
              rentedPosts.reduce((total, post) => total + post.price, 0)
            )}đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentedPostsList;