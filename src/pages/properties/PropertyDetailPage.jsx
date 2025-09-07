import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Space } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ImageGallery from '../../components/properties/detail/ImageGallery';
import PropertyInfo from '../../components/properties/detail/PropertyInfo';
import PropertyTabs from '../../components/properties/detail/PropertyTabs';
import BookingSection from '../../components/properties/detail/BookingSection';
import { interiorBedroom } from '../../assets';

const { Content } = Layout;

// Mock data cho property detail
const mockPropertyDetail = {
  id: 1,
  title: 'CHO THUÊ PHÒNG TRỌ GẦN SÂN BAY - CỘNG VIÊN HOÀNG VĂN THỤ',
  address: 'Đường Bạch Đằng, Phường 2, Quận Tân Bình, Tp Hồ Chí Minh',
  price: 2500000,
  rating: 4.8,
  reviewCount: 19,
  images: [
    interiorBedroom,
    interiorBedroom,
    interiorBedroom,
    interiorBedroom,
    interiorBedroom
  ],
  description: 'Phòng đơn: Diện tích 16 m², phù hợp cho 1 người ở, phòng có WC riêng, cửa sổ thoáng, wifi miễn phí. Nằm trong chung chủ, gần gũi với người dân xung quanh với hoạc nhân viên vào phòng cần xin và giai gảng, gia nóít ly.',
  amenities: [
    { name: 'Giường', icon: '🛏️' },
    { name: 'WC riêng', icon: '🚿' },
    { name: 'Wifi', icon: '📶' },
    { name: 'Máy lạnh', icon: '❄️' },
    { name: 'Cửa sổ / ban công', icon: '🪟' },
    { name: 'Camera an ninh / chỗ để xe', icon: '📹' }
  ],
  reviews: [
    {
      id: 1,
      name: 'P****',
      date: '26/06/2025',
      rating: 5,
      comment: 'Phòng sạch sẽ, thoải mái. Chủ nhà dễ thương'
    },
    {
      id: 2,
      name: 'D****',
      date: '20/4/2021',
      rating: 4,
      comment: ''
    }
  ],
  rentalTerms: {
    deposit: '1 tháng tiền thuê',
    advancePayment: '1 tháng tiền thuê',
    electricityCost: '3,800đ / kWh',
    waterCost: '80,000đ / người / tháng',
    internetCost: '50,000đ / tháng',
    parkingCost: '200,000đ / tháng',
    contractPeriod: 'Có thể thoát thuộm miến hoặc viết tay theo ngân, không có thúc đẩi nào'
  }
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperty(mockPropertyDetail);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Property not found</div>;
  }

  return (
    <Layout className="min-h-screen bg-white">
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {property.title}
              </h1>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">{property.address}</p>
              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <span className="text-yellow-500">★ {property.rating}/5</span>
                <span className="text-gray-500">({property.reviewCount} đánh giá)</span>
              </div>
            </div>
            <Button
              type="text"
              icon={isLiked ? <HeartFilled className="!text-red-500" /> : <HeartOutlined className='!text-red-500' />}
              onClick={handleLikeToggle}
              className="text-lg self-start sm:self-auto hover:bg-red-50 rounded-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <Row gutter={[16, 24]} className="w-full">
          {/* Left Column - Images and Details */}
          <Col xs={24} lg={16} className="w-full">
            <Space direction="vertical" size="large" className="w-full">
              {/* Image Gallery */}
              <div className="w-full overflow-hidden">
                <ImageGallery images={property.images} />
              </div>

              {/* Property Information Tabs */}
              <div className="w-full">
                <PropertyTabs property={property} />
              </div>
            </Space>
          </Col>

          {/* Right Column - Property Info and Booking */}
          <Col xs={24} lg={8} className="w-full">
            <div className="lg:sticky lg:top-6 space-y-6 mt-6 lg:mt-0">
              <PropertyInfo property={property} />
              <BookingSection property={property} />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PropertyDetailPage;
