import React from 'react';
import { registerImage } from '../../assets';
import { Button, Form, Input, Statistic, Typography } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const rawData = {
  otp: {
    phone: '0987654321',
    code: '123456'
  }
};

const OTPForm = () => {

  const hidePhoneNumber = (phone) => {
    return phone.split('').map((char, index) => (index > 2 && index <= 7 ? 'x' : char)).join('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[100vh]">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 px-2 py-6 lg:px-10 lg:py-auto lg:my-20 sm:py-20 sm:px-20'>
        {/* Image section */}
        <div className="hidden lg:flex items-center justify-center">
          <img src={registerImage} alt='Register' className="w-[320px] h-[320px] lg:w-[510px] lg:h-[510px] object-cover" />
        </div>

        {/* Form section */}
        <div className="flex items-center justify-center">
          <Form
            name={'OTP'}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            className="w-full min-h-full"
          >
            <Typography.Title level={1} className="text-center mb-6">
              <Link to={'/register'}>
                <Typography.Link>
                  <ArrowLeftOutlined className='text-2xl !text-black mr-5' />
                </Typography.Link>
              </Link>
              <Typography.Text className='!text-4xl'>Nhập mã xác nhận</Typography.Text>
              <br />
              <Typography.Text className="text-center mb-6 !text-xl !text-gray-500 !my-5" style={{ fontWeight: 'normal' }}>
                Mã xác nhận đã gửi đến số <span className='text-[#1989fb] font-bold'>{hidePhoneNumber(rawData.otp.phone)}</span>
              </Typography.Text>
            </Typography.Title>

            <Form.Item
              className="flex justify-center !my-10"
              name="otp"
            // rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
            >
              <Input.OTP
                length={6}
                size="large"
                className="w-full max-w-xs"
                inputStyle={{
                  fontSize: 24,
                  borderRadius: 8,
                  border: '1px solid #1279a2',
                  marginRight: 8,
                  background: '#f0f9ff',
                }}
              />
            </Form.Item>

            <div className='w-100 mx-auto my-5 flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2'>
                <span className='text-xl'>
                  <Link className='!text-black'>Gửi lại mã</Link>
                </span>
                <Statistic.Timer value={Date.now() + 1000 * 60 * 2} format='mm:ss' type='countdown' />
              </div>
              <div className='text-xl'>
                Hotline: 1900 1234
              </div>
            </div>

            <Form.Item label={null} className='flex justify-center'>
              <Button htmlType="submit" className="w-100 !h-[50px] !text-xl !bg-[#1279a2] !text-white" size='large' icon={<ArrowRightOutlined />} iconPosition='end'>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;