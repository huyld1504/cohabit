import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Image,
  Avatar,
  Rate,
  Badge,
  Tooltip,
  message
} from 'antd';
import {
  ArrowLeftOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  FireOutlined,
  ToolOutlined,
  SettingOutlined,
  SafetyOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const RentedPostDetail = ({ postData }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // Mock data - replace with actual props
  const mockData = {
    id: 1,
    title: "Phòng trọ 20m² gần ĐH Bách Khoa",
    address: "Đường Bách Đăng, Phường 2, Quận Tân Bình, TP Hồ Chí Minh",
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    price: "3,500,000 VNĐ/tháng",
    deposit: "1 tháng",
    area: "20m²",
    rating: 4.8,
    reviewCount: 18,
    isLiked: false,

    // Room details
    roomInfo: {
      area: "20m²",
      price: "3,500,000 VNĐ/tháng",
      deposit: "1 tháng",
      description: "Phòng đơn có diện tích 20m², phù hợp cho 1 người. Ở phòng có WC riêng, cửa số thoáng, wifi mạnh, không chung chủ, giá gác để vào tư đó. Thích hợp về ở sinh viên hoặc nhân viên văn phong cần vỏ gần trung tâm giá hợp lý."
    },

    // Amenities
    amenities: [
      { icon: <HomeOutlined />, label: "Giường" },
      { icon: <ToolOutlined />, label: "WC riêng" },
      { icon: <WifiOutlined />, label: "Wifi" },
      { icon: <FireOutlined />, label: "Máy lạnh" },
      { icon: <SettingOutlined />, label: "Cửa sổ / ban công" },
      { icon: <SafetyOutlined />, label: "Bếp / tủ lạnh" }
    ],

    // Utilities & Policies
    utilities: {
      electricity: "3,500 VNĐ/kWh",
      water: "80,000 VNĐ/người",
      wifi: "Miễn phí",
      parking: "Có chỗ để xe (miễn phí)",
      smoking: "Không hút thuốc",
      pets: "Không ôn nuôi thú cưng"
    },

    // Rental policies
    policies: [
      "Hình thức thuê theo tháng",
      "Tiền cọc: 1 tháng thuê làm tiền cọc (không về phạm)",
      "Thanh toán: Đầu tháng",
      "Thanh toán: Đầu tháng sớ 5 ngày & Thứ tư 1 người/tháng"
    ],

    // Renter information
    renter: {
      name: "Nguyễn Văn A",
      phone: "0987654321",
      cccd: "0123456789",
      email: "nguyenvana@email.com",
      rentDate: "12/07/2025",
      note: "Tôi muốn thuê ngay lập tức. Có thể chuyển vào tuần sau không?"
    }
  };

  const data = postData || mockData;

  const handleLike = () => {
    setIsLiked(!isLiked);
    message.success(isLiked ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích');
  };

  const handleContact = () => {
    message.info('Tính năng liên hệ đang phát triển');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Title level={3} className="!mb-0">Chi tiết bài đăng được thuê</Title>
            </div>
            <Button
              type="primary"
              size="large"
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              + Tạo bài đăng
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Row gutter={[24, 24]}>
          {/* Left Column - Property Details */}
          <Col xs={24} lg={16}>
            <Card className="!shadow-sm">
              {/* Property Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <Title level={2} className="!mb-2">
                    {data.title}
                  </Title>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <EnvironmentOutlined className="mr-1" />
                      {data.address}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleLike}
                    className={`${isLiked ? 'text-red-500 border-red-500' : ''}`}
                  >
                    Yêu thích
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Rate disabled defaultValue={data.rating} size="small" />
                    <Text strong>{data.rating}/5</Text>
                    <Text className="text-gray-500">({data.reviewCount} Đánh giá)</Text>
                  </div>
                </div>
              </div>

              {/* Property Images */}
              <div className="mb-8">
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Image
                      src={data.images[0]}
                      alt="Main image"
                      className="w-full h-80 object-cover rounded-lg"
                      fallback="/api/placeholder/400/320"
                    />
                  </Col>
                  <Col span={12}>
                    <Row gutter={[8, 8]}>
                      {data.images.slice(1, 5).map((image, index) => (
                        <Col span={12} key={index}>
                          <Image
                            src={image}
                            alt={`Image ${index + 2}`}
                            className="w-full h-36 object-cover rounded-lg"
                            fallback="/api/placeholder/200/144"
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Room Information */}
              <div className="mb-8">
                <Title level={4} className="!mb-4">Thông tin phòng trọ:</Title>
                <Row gutter={[16, 16]} className="mb-4">
                  <Col span={8}>
                    <div className="text-center">
                      <Text className="text-gray-500">Diện tích:</Text>
                      <div className="font-medium text-lg">{data.roomInfo.area}</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Text className="text-gray-500">Giá thuê:</Text>
                      <div className="font-medium text-lg">{data.roomInfo.price}</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Text className="text-gray-500">Cọc:</Text>
                      <div className="font-medium text-lg">{data.roomInfo.deposit}</div>
                    </div>
                  </Col>
                </Row>
                <Paragraph className="text-gray-700 leading-relaxed">
                  {data.roomInfo.description}
                </Paragraph>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <Title level={4} className="!mb-4">Tiện nghi:</Title>
                <Row gutter={[16, 16]}>
                  {data.amenities.map((amenity, index) => (
                    <Col span={8} key={index}>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-cyan-600 text-lg">{amenity.icon}</div>
                        <span>{amenity.label}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Utilities */}
              <div className="mb-8">
                <Title level={4} className="!mb-4">Điều kiện:</Title>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Điện:</Text>
                        <Text strong>{data.utilities.electricity}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Nước:</Text>
                        <Text strong>{data.utilities.water}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Wifi:</Text>
                        <Text strong>{data.utilities.wifi}</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Để xe sàn:</Text>
                        <Text strong>Có chỗ để xe (miễn phí)</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Không hút thuốc:</Text>
                        <Tag color="green">✓</Tag>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-gray-600">Không ôn nuôi thú cưng:</Text>
                        <Tag color="green">✓</Tag>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Policies */}
              <div className="mb-8">
                <Title level={4} className="!mb-4">Chính sách:</Title>
                <div className="space-y-2">
                  {data.policies.map((policy, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
                      <Text>{policy}</Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-6">
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                  size="large"
                  className="hover:bg-gray-100"
                >
                  Quay lại
                </Button>
              </div>
            </Card>
          </Col>

          {/* Right Column - Renter Information */}
          <Col xs={24} lg={8}>
            <Card className="!shadow-sm sticky top-6">
              <Title level={4} className="!mb-4">Thông tin người thuê:</Title>

              <div className="space-y-4">
                {/* Renter Profile */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Avatar size={48} icon={<UserOutlined />} />
                  <div>
                    <Text strong className="text-lg">{data.renter.name}</Text>
                    <div className="text-gray-500">Người thuê</div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-600">Số điện thoại:</Text>
                    <Text strong>{data.renter.phone}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-600">CCCD:</Text>
                    <Text strong>{data.renter.cccd}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-600">Số email:</Text>
                    <Text strong>{data.renter.email}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-600">Tình trạng:</Text>
                    <Tag color="green">Đã thuê thành công</Tag>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-600">Lời nhắn:</Text>
                    <Text strong className="text-right max-w-48 truncate" title={data.renter.note}>
                      {data.renter.note}
                    </Text>
                  </div>
                </div>

                <Divider />

                {/* Rental Date */}
                <div className="text-center">
                  <Text className="text-gray-600">Ngày thuê:</Text>
                  <div className="text-2xl font-bold text-cyan-600 mt-1">
                    {data.renter.rentDate}
                  </div>
                </div>

                <Divider />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<MessageOutlined />}
                    onClick={handleContact}
                    className="bg-cyan-500 hover:bg-cyan-600"
                  >
                    Liên hệ ngay
                  </Button>

                  <Button
                    size="large"
                    block
                    icon={<PhoneOutlined />}
                    onClick={() => window.open(`tel:${data.renter.phone}`)}
                  >
                    Gọi điện thoại
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RentedPostDetail;