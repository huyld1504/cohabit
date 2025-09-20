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
  description: 'Phòng đơn: Diện tích 16 m², phù hợp cho 1 người ở, phòng có WC riêng, cửa sổ thoáng, wifi miễn phí. Nằm trong chung cư, gần gũi với người dân xung quanh với hoạt động thân thiện.',

  // HTML Content từ CK Editor (format chuẩn - không có Tailwind classes)
  amenitiesContent: `
    <h3>🏠 Tiện nghi phòng</h3>
    <ul>
      <li><strong>🛏️ Giường:</strong> Giường đơn thoải mái với nệm mới</li>
      <li><strong>🚿 WC riêng:</strong> Phòng tắm riêng biệt, sạch sẽ</li>
      <li><strong>📶 Wifi:</strong> Tốc độ cao, miễn phí</li>
      <li><strong>❄️ Máy lạnh:</strong> Inverter tiết kiệm điện</li>
      <li><strong>🪟 Cửa sổ:</strong> Thoáng mát, ánh sáng tự nhiên</li>
      <li><strong>📹 An ninh:</strong> Camera giám sát, khu để xe an toàn</li>
    </ul>
    
    <h3>💰 Chi phí tiện ích</h3>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="padding: 8px;"><strong>Điện</strong></td>
          <td style="padding: 8px;">3,800đ / kWh</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Nước</strong></td>
          <td style="padding: 8px;">80,000đ / người / tháng</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Internet</strong></td>
          <td style="padding: 8px;">50,000đ / tháng</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Gửi xe</strong></td>
          <td style="padding: 8px;">200,000đ / tháng</td>
        </tr>
      </tbody>
    </table>
  `,

  rentalTermsContent: `
    <h3>📋 Điều kiện thuê trọ</h3>
    
    <h4 style="color: #1e40af; margin-top: 20px;">💳 Hình thức thuê</h4>
    <ul>
      <li><strong>Loại hợp đồng:</strong> Theo tháng (tối thiểu 6 tháng)</li>
      <li><strong>Thanh toán:</strong> Trước ngày 5 hàng tháng</li>
      <li><strong>Tiền cọc:</strong> 2 tháng tiền thuê</li>
    </ul>
    
    <h4 style="color: #059669; margin-top: 20px;">🕐 Quy định sinh hoạt</h4>
    <ul>
      <li><strong>Giờ giấc:</strong> Tự do 24/7 (không chung chủ)</li>
      <li><strong>Số người:</strong> Tối đa 1 người, không ở ghép</li>
      <li><strong>Khách:</strong> Được đón khách đến chơi (đến 22h)</li>
      <li><strong>Hút thuốc:</strong> <span style="color: #dc2626;">Nghiêm cấm trong phòng</span></li>
    </ul>
    
    <h4 style="color: #dc2626; margin-top: 20px;">⚠️ Lưu ý quan trọng</h4>
    <ul>
      <li>Giữ gìn vệ sinh chung, không gây tiếng ồn</li>
      <li>Báo trước khi có khách đến ở qua đêm</li>
      <li>Không được sửa chữa, cải tạo phòng tùy ý</li>
      <li>Tự bảo quản tài sản cá nhân</li>
    </ul>
  `,

  policiesContent: `
    <h3>💰 Chính sách cọc & hủy thuê</h3>
    
    <h4 style="color: #1e40af; margin-top: 20px;">💵 Tiền cọc</h4>
    <ul>
      <li><strong>Số tiền:</strong> 2 tháng tiền thuê</li>
      <li><strong>Mục đích:</strong> Đảm bảo thực hiện hợp đồng</li>
      <li><strong>Hoàn trả:</strong> Sau 7 ngày kể từ khi trả phòng (không có hư hỏng)</li>
    </ul>
    
    <h4 style="color: #059669; margin-top: 20px;">📢 Thông báo trả phòng</h4>
    <ul>
      <li><strong>Thời gian báo trước:</strong> 30 ngày</li>
      <li><strong>Hình thức:</strong> Thông báo bằng văn bản hoặc email</li>
      <li><strong>Nội dung:</strong> Ghi rõ ngày dự kiến trả phòng</li>
    </ul>
    
    <h4 style="color: #d97706; margin-top: 20px;">❌ Chính sách hủy hợp đồng</h4>
    <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Thời gian hủy</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Hoàn cọc</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 10px;">Trước khi nhận phòng</td>
          <td style="border: 1px solid #d1d5db; padding: 10px; color: #059669;"><strong>100%</strong></td>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 10px;">Trong 30 ngày đầu</td>
          <td style="border: 1px solid #d1d5db; padding: 10px; color: #d97706;"><strong>50%</strong></td>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 10px;">Sau 30 ngày</td>
          <td style="border: 1px solid #d1d5db; padding: 10px; color: #dc2626;"><strong>0%</strong></td>
        </tr>
      </tbody>
    </table>
    
    <p style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #f59e0b;">
      <strong style="color: #92400e;">💡 Điều khoản đặc biệt:</strong><br>
      • Vi phạm nội quy nghiêm trọng: không hoàn cọc<br>
      • Hư hỏng tài sản: trừ vào tiền cọc theo giá thị trường<br>
      • Thanh toán chậm từ 2 tháng: chấm dứt hợp đồng
    </p>
  `,

  // Fallback data (giữ nguyên để backward compatibility)
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
    deposit: '2 tháng tiền thuê',
    advancePayment: '1 tháng tiền thuê',
    electricityCost: '3,800đ / kWh',
    waterCost: '80,000đ / người / tháng',
    internetCost: '50,000đ / tháng',
    parkingCost: '200,000đ / tháng',
    contractPeriod: 'Hợp đồng theo tháng, tối thiểu 6 tháng'
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
