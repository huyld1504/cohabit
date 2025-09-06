import React, { useState } from 'react';
import { Button, Card, Space, Modal, Form, Input, DatePicker, message } from 'antd';
import { PhoneOutlined, MessageOutlined, CalendarOutlined } from '@ant-design/icons';

const BookingSection = ({ property }) => {
    const [bookingModalVisible, setBookingModalVisible] = useState(false);
    const [contactModalVisible, setContactModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleBookingSubmit = (values) => {
        console.log('Booking data:', values);
        message.success('Yêu cầu thuê phòng đã được gửi thành công!');
        setBookingModalVisible(false);
        form.resetFields();
    };

    const handleContactOwner = () => {
        setContactModalVisible(true);
    };

    return (
        <>
            <Card className="w-full sticky top-4">
                <Space direction="vertical" size="large" className="w-full">
                    {/* Action Buttons */}
                    <Space direction="vertical" size="middle" className="w-full">
                        <Button
                            type="primary"
                            size="large"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => setBookingModalVisible(true)}
                            icon={<CalendarOutlined />}
                        >
                            Xác nhận thuê
                        </Button>

                        <Button
                            type="default"
                            size="large"
                            className="w-full"
                            onClick={handleContactOwner}
                            icon={<PhoneOutlined />}
                        >
                            Liên hệ chủ nhà
                        </Button>

                        <Button
                            type="default"
                            size="large"
                            className="w-full"
                            icon={<MessageOutlined />}
                        >
                            Nhắn tin
                        </Button>
                    </Space>

                    {/* Additional Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Thông tin quan trọng:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Tiền cọc: 1 tháng tiền thuê</li>
                            <li>• Thanh toán trước: 1 tháng</li>
                            <li>• Hợp đồng tối thiểu: 3 tháng</li>
                            <li>• Xem phòng miễn phí</li>
                        </ul>
                    </div>

                    {/* Safety Notice */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800">
                            <strong>Lưu ý:</strong> Chỉ thanh toán sau khi đã xem phòng và ký hợp đồng.
                            Tránh các giao dịch đáng ngờ.
                        </p>
                    </div>
                </Space>
            </Card>

            {/* Booking Modal */}
            <Modal
                title="Xác nhận thuê phòng"
                open={bookingModalVisible}
                onCancel={() => setBookingModalVisible(false)}
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleBookingSubmit}
                    className="mt-4"
                >
                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ email" />
                    </Form.Item>

                    <Form.Item
                        name="moveInDate"
                        label="Ngày dự kiến chuyển vào"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày chuyển vào!' }]}
                    >
                        <DatePicker className="w-full" placeholder="Chọn ngày" />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Tin nhắn (tùy chọn)"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Gửi lời nhắn đến chủ nhà..."
                        />
                    </Form.Item>

                    <div className="flex space-x-3">
                        <Button
                            onClick={() => setBookingModalVisible(false)}
                            className="flex-1"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="flex-1 bg-blue-600"
                        >
                            Gửi yêu cầu
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* Contact Modal */}
            <Modal
                title="Thông tin liên hệ"
                open={contactModalVisible}
                onCancel={() => setContactModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setContactModalVisible(false)}>
                        Đóng
                    </Button>
                ]}
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Chủ nhà: Nguyễn Văn A</h4>
                        <p className="text-gray-600">Đã xác minh danh tính</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <PhoneOutlined className="text-blue-600" />
                            <span className="font-medium">0901 234 567</span>
                            <Button size="small" type="link">Gọi ngay</Button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MessageOutlined className="text-green-600" />
                            <span>Zalo: 0901 234 567</span>
                            <Button size="small" type="link">Nhắn tin</Button>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                            <strong>Thời gian liên hệ tốt nhất:</strong> 8:00 - 22:00 hàng ngày
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BookingSection;
