import React from 'react';
import { Card, Row, Col, Descriptions, Tag, Alert } from 'antd';
import SafeHTMLRenderer from '../../common/SafeHTMLRenderer';

const RentalTerms = ({
  terms = {},
  rentalTermsContent = null // HTML content from database
}) => {
  // Nếu có HTML content từ database, ưu tiên hiển thị nội dung đó
  if (rentalTermsContent) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Điều kiện thuê trọ</h3>
        <SafeHTMLRenderer
          htmlContent={rentalTermsContent}
          className="rental-terms-content"
        />
      </div>
    );
  }

  // Fallback về hiển thị cũ nếu chưa có HTML content
  // Chỉ hiển thị nếu có terms data
  if (!terms || Object.keys(terms).length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Điều kiện thuê trọ</h3>

      <Row gutter={[16, 16]} className="mb-4">
        {/* Rental Information */}
        <Col xs={24} lg={12}>
          <Card title="Hình thức thuê" className="h-full">
            <Descriptions column={1} size="small" className="[&_.ant-descriptions-item-label]:w-[35%]">
              <Descriptions.Item label="Hình thức thuê">
                <div className="flex flex-wrap">
                  <Tag color="blue" className="text-xs">
                    Theo tháng
                  </Tag>
                  <span className="text-xs text-gray-500 mt-1">
                    (không cho thuê theo ngày-tuần-giới)
                  </span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Tiền thuê">
                <span className="font-semibold text-green-600 text-sm">
                  Thanh toán đầy đủ mỗi tháng
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Tiền cọc">
                <span className="font-semibold text-sm">
                  {terms.deposit || '1 tháng tiền thuê'}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Schedule & Rules */}
        <Col xs={24} lg={12}>
          <Card title="Giờ giấc ra vào" className="h-full">
            <Descriptions column={1} size="small" className="[&_.ant-descriptions-item-label]:w-[35%]">
              <Descriptions.Item label="Giờ giấc">
                <div className="space-y-1">
                  <Tag color="green" className="text-xs">Tự do 24/7</Tag>
                  <div className="text-xs text-gray-500">không chung chủ</div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Số người ở">
                <div className="text-sm">
                  <span className="font-semibold">Tối đa 1 người</span>
                  <div className="text-xs text-gray-500 mt-1">
                    (không đón bạn bè, không có gái)
                  </div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Nội thất">
                <div className="text-sm break-words">
                  Được phép tự trang trí và không gây tiếng ồn hoặc mùi manh
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Hút thuốc">
                <Tag color="red" className="text-xs">Không cho hút thuốc trong phòng</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Contract Information */}
        <Col xs={24}>
          <Card title="Hợp đồng">
            <div className="space-y-3">
              <div className="text-gray-700 text-sm">
                <strong>Điều khoản hợp đồng:</strong>
                <div className="mt-2 text-sm break-words leading-relaxed">
                  {terms.contractPeriod}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RentalTerms;
