import React from 'react';
import { welcomeImage, registerImage } from '../../assets/index';
import { Button, Form, Input, Typography } from 'antd';
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserSuccess } from '../../redux/features/user.slice';

const user = {
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  type: 'pro'
}

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(fetchUserSuccess(user));
    navigate('/');
  }
  return (
    <div className="w-full max-w-7xl mx-auto min-h-[100vh]">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 px-2 py-6 lg:px-10 lg:py-auto lg:my-20 sm:py-20 sm:px-20'>
        {/* Image section */}
        <div className="hidden lg:flex items-center justify-center">
          <img src={type === 'login' ? welcomeImage : registerImage} alt={type === 'login' ? 'Welcome' : 'Register'} className="w-[320px] h-[320px] lg:w-[510px] lg:h-[510px] object-cover" />
        </div>

        {/* Form section */}
        <div className="flex items-center justify-center">
          <Form
            name={type === 'login' ? 'Login' : 'Register'}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            className="w-full min-h-full"
            onFinish={type === 'login' ? handleLogin : undefined}
          >
            <Typography.Title level={1} className="text-left mb-6">
              Cohabit xin chào!
              <Typography.Text className="block text-left mt-3 text-base">
                {type === 'login' ? 'Đăng nhập để tìm phòng trọ ưng ý với những ưu đãi độc quyền dành cho thành viên.' : 'Đăng ký thành viên ngay để tìm phòng trọ ưng ý với những ưu đãi độc quyền dành cho thành viên.'}
              </Typography.Text>
            </Typography.Title>

            <Form.Item className='w-full'>
              <Input type='text' placeholder='Số điện thoại' size='large' className='w-full' style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item className='w-full'>
              <Input.Password type='password' placeholder='Mật khẩu' size='large' className='w-full' style={{ width: '100%' }} />
            </Form.Item>

            {type === 'register' && (
              <Typography.Title level={1} className="text-left mb-6">
                <Typography.Text className="block text-left mt-3 text-base">
                  Bằng việc đăng kí tài khoản, tôi đồng ý với
                  <Typography.Text underline> Điều khoản sử dụng </Typography.Text>
                  và
                  <Typography.Text underline> Chính sách bảo mật </Typography.Text> của Cohabit.
                </Typography.Text>
              </Typography.Title>
            )}

            <Form.Item label={null}>
              <Button htmlType="submit" className="w-full !h-[50px] !text-xl !bg-[#1279a2] !text-white" size='large' icon={<ArrowRightOutlined />} iconPosition='end'>
                Xác nhận
              </Button>
            </Form.Item>

            <Typography.Title level={1} className="text-left mb-6 !text-5xl">
              <Typography.Text className="block text-left mt-3 text-base">
                {type === 'login' ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản Cohabit? '}
                <Typography.Link className='text-blue-500'>
                  <Link to={type === 'login' ? '/register' : '/login'}>
                    {type === 'login' ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                    <RightOutlined className='ml-5 !text-black' />
                  </Link>
                </Typography.Link>
              </Typography.Text>
            </Typography.Title>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;