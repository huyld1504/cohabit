import React from 'react';
import { Card, Row, Col, Descriptions, Tag } from 'antd';

const RentalTerms = ({ terms = {} }) => {

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Điều kiện thuê trọ</h3>

      <Row gutter={[16, 16]}>
        {/* Rental Information */}
        <Col xs={24} lg={12}>
          <Card title="Hình thức thuê" className="h-full">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Hình thức thuê">
                <Tag color="blue">Theo tháng (không cho thuê theo ngày-tuần-giới)</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tiền thuê">
                <span className="font-semibold text-green-600">
                  Thanh toán đầy đủ mỗi tháng
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Tiền cọc">
                <span className="font-semibold">
                  {terms.deposit || '1 tháng tiền thuê'}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Schedule & Rules */}
        <Col xs={24} lg={12}>
          <Card title="Giờ giấc ra vào" className="h-full">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Giờ giấc">
                <Tag color="green">Tự do 24/7, không chung chủ</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Số người ở">
                <span className="font-semibold">
                  Tối đa 1 người (không đón bạn bè, không có gái)
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Nội thất">
                Được phép tự trang trí và không gây tiếng ồn hoặc mùi manh
              </Descriptions.Item>
              <Descriptions.Item label="Hút thuốc">
                <Tag color="red">Không cho hút thuốc trong phòng</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Utility Costs */}
        <Col xs={24}>
          <Card title="Tiện ích hỗ phần">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {terms.electricityCost || '3,800đ'}
                  </div>
                  <div className="text-sm text-gray-600">Điện / kWh</div>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {terms.waterCost || '80,000đ'}
                  </div>
                  <div className="text-sm text-gray-600">Nước / người / tháng</div>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {terms.internetCost || '50,000đ'}
                  </div>
                  <div className="text-sm text-gray-600">Wifi / tháng</div>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {terms.parkingCost || '200,000đ'}
                  </div>
                  <div className="text-sm text-gray-600">Xe máy, ô tô / tháng</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Contract Information */}
        <Col xs={24}>
          <Card title="Hợp đồng">
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Điều khoản hợp đồng:</strong> {terms.contractPeriod || 'Có thể thoát thuộm miến hoặc viết tay theo ngân, không có thúc đẩi nào'}
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Lưu ý quan trọng:</h4>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• Hợp đồng được ký kết rõ ràng, minh bạch</li>
                  <li>• Các điều khoản được thỏa thuận trước khi ký hợp đồng</li>
                  <li>• Mọi thay đổi cần có sự đồng ý của cả hai bên</li>
                  <li>• Bảo đảm quyền lợi cho cả chủ nhà và người thuê</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RentalTerms;
