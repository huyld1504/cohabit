import React, { useState } from 'react';
import { Row, Col, Typography, Breadcrumb, Alert, Button } from 'antd';
import { HomeOutlined, FileTextOutlined, FileDoneOutlined, FileProtectOutlined, FileAddOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ContractCard from '../../components/contracts/ContractCard';
import { Header, Footer } from '../../components/common';
import { useRole } from '../../hooks/useRole';

const { Title, Paragraph } = Typography;

const ContractsPage = () => {
  const navigate = useNavigate();
  const { isPlusMember } = useRole();

  // State to manage contract drive links - can be updated later
  const [contracts] = useState([
    {
      id: 1,
      title: 'Residential House Lease Agreement',
      description: 'Hợp đồng thuê nhà ở dân dụng chuẩn, bao gồm đầy đủ các điều khoản về quyền và nghĩa vụ của hai bên.',
      driveLink: 'https://drive.google.com/drive/folders/1GJRlA9byhNBeOH109B_PrLZnvHMlgMMt', // Will be added later
      icon: <FileTextOutlined className="text-blue-500 text-2xl" />
    },
    {
      id: 3,
      title: 'Lease Agreement Extension Appendix Type 1',
      description: 'Phụ lục gia hạn hợp đồng thuê mẫu 1, áp dụng cho trường hợp gia hạn đơn giản không thay đổi điều khoản.',
      driveLink: 'https://drive.google.com/drive/folders/1aF9mVdueLjfWYqW7LwBn2cqbpZ_kkGnC', // Will be added later
      icon: <FileAddOutlined className="text-green-500 text-2xl" />
    },
    {
      id: 2,
      title: 'Lease Agreement Extension Appendix Type 2',
      description: 'Phụ lục gia hạn hợp đồng thuê mẫu 2, dùng để gia hạn thời gian thuê và cập nhật các điều khoản mới.',
      driveLink: 'https://drive.google.com/drive/folders/1L0PdUiZvqxMSWTk1c1A5NN67TzJU_N5E', // Will be added later
      icon: <FileAddOutlined className="text-green-500 text-2xl" />
    },
    {
      id: 4,
      title: 'Contract Settlement Minutes',
      description: 'Biên bản thanh lý hợp đồng, sử dụng khi kết thúc hợp đồng và hoàn trả tiền cọc, tài sản.',
      driveLink: 'https://drive.google.com/drive/folders/1Z0P62m1mWJ-V1jVBxmvTgun1leEjpfYz', // Will be added later
      icon: <FileDoneOutlined className="text-orange-500 text-2xl" />
    },
    {
      id: 5,
      title: 'Boarding House Room Rental Agreement',
      description: 'Hợp đồng thuê phòng trọ, phù hợp cho việc thuê phòng trong nhà trọ, ký túc xá.',
      driveLink: 'https://drive.google.com/drive/folders/1t6MqAmZNwiUvNmDf2HFEFZ2fL-4eqEgL', // Will be added later
      icon: <FileProtectOutlined className="text-purple-500 text-2xl" />
    },
    {
      id: 6,
      title: 'Apartment Lease Agreement',
      description: 'Hợp đồng thuê căn hộ chung cư, bao gồm các điều khoản riêng cho căn hộ cao cấp.',
      driveLink: 'https://drive.google.com/drive/folders/1t6MqAmZNwiUvNmDf2HFEFZ2fL-4eqEgL', // Will be added later
      icon: <FileTextOutlined className="text-red-500 text-2xl" />
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Title level={1} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            Mẫu Hợp Đồng Cho Thuê
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tải xuống các mẫu hợp đồng chuẩn để sử dụng cho việc cho thuê nhà, phòng trọ.
            Tất cả các mẫu hợp đồng đều được soạn thảo theo quy định pháp luật hiện hành.
          </Paragraph>
        </div>

        {/* Upgrade Prompt for Non-Plus Users
        {!isPlusMember() && (
          <Alert
            message={
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <CrownOutlined className="text-2xl text-yellow-500" />
                  <div>
                    <span className="font-semibold text-base">
                      Nâng cấp lên Plus để tận dụng tối đa các tính năng!
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Đăng bài cho thuê không giới hạn, quản lý bài đăng chi tiết, và nhiều tính năng khác.
                    </p>
                  </div>
                </div>
                <Button
                  type="primary"
                  icon={<CrownOutlined />}
                  size="large"
                  className="!bg-yellow-500 hover:!bg-yellow-600 !border-yellow-500 hover:!border-yellow-600"
                  onClick={() => navigate('/premium')}
                >
                  Nâng cấp ngay
                </Button>
              </div>
            }
            type="warning"
            className="mb-8 !bg-yellow-50 !border-yellow-300"
            showIcon={false}
          />
        )} */}

        {/* Contracts Grid */}
        <Row gutter={[24, 24]} className="mb-12">
          {contracts.map((contract) => (
            <Col key={contract.id} xs={24} sm={12} lg={8}>
              <ContractCard
                title={contract.title}
                description={contract.description}
                driveLink={contract.driveLink}
                icon={contract.icon}
              />
            </Col>
          ))}
        </Row>

        {/* Additional Info Section */}
        <div className="bg-blue-50 rounded-lg p-8 mt-8">
          <Title level={3} className="!text-xl !font-semibold !text-gray-900 !mb-4">
            Lưu ý khi sử dụng mẫu hợp đồng
          </Title>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Đọc kỹ toàn bộ nội dung hợp đồng trước khi ký kết</li>
            <li>Điền đầy đủ thông tin của hai bên vào các trường thông tin</li>
            <li>Kiểm tra kỹ các điều khoản về tiền thuê, tiền cọc, và thời hạn thuê</li>
            <li>Lưu giữ bản gốc hợp đồng và các phụ lục liên quan</li>
            <li>Tham khảo ý kiến luật sư nếu cần thiết</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;
