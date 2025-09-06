import React from 'react';
import { Card, Row, Col, Progress, Rate, Avatar, Button } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';

const ReviewsSection = ({ reviews = [], rating = 0, reviewCount = 0 }) => {
  // Mock rating breakdown data
  const ratingBreakdown = [
    { stars: 5, count: 15, percentage: 78.9 },
    { stars: 4, count: 3, percentage: 15.8 },
    { stars: 3, count: 1, percentage: 5.3 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const formatDate = (dateString) => {
    return dateString; // Already formatted in the data
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Đánh giá</h3>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                {rating}/5
              </div>
              <Rate disabled defaultValue={rating} className="text-lg mb-2" />
              <div className="text-gray-600">
                {reviewCount} đánh giá
              </div>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <div className="space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center space-x-3">
                  <span className="w-8 text-sm text-gray-600">
                    {item.stars}★
                  </span>
                  <Progress
                    percent={item.percentage}
                    showInfo={false}
                    strokeColor="#faad14"
                    className="flex-1"
                  />
                  <span className="w-8 text-sm text-gray-600">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      {/* Individual Reviews */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Nhận xét từ khách thuê</h4>

        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border border-gray-200">
              <div className="flex space-x-4">
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  className="bg-blue-500"
                >
                  {getInitials(review.name)}
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Khách hàng: {review.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        Đánh giá:
                      </div>
                      <Rate
                        disabled
                        defaultValue={review.rating}
                        size="small"
                      />
                    </div>
                  </div>

                  {review.comment && (
                    <p className="text-gray-700 mb-2">
                      {review.comment}
                    </p>
                  )}

                  <div className="text-sm text-gray-500">
                    {formatDate(review.date)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {reviews.length > 0 && (
          <div className="text-center mt-6">
            <Button type="default" icon={<MoreOutlined />}>
              Hiển thị thêm đánh giá
            </Button>
          </div>
        )}

        {/* No Reviews State */}
        {reviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Chưa có đánh giá nào cho phòng này</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
