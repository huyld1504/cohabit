import React, { useState } from 'react';
import { Button, Input, Typography, Steps, Form, Statistic } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, PhoneOutlined, SafetyOutlined, LockOutlined, RightOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerImage } from '../../assets';
import { authAPI } from '../../api/auth.api';
import { registrationValidators } from '../../schemas/registrationSchemas';

const { Step } = Steps;

const StepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [otpExpiration, setOtpExpiration] = useState(null);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const navigate = useNavigate();

  // Ant Design Form instances
  const [emailPhoneForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Step 1: Email và Phone Number Input
  const handleEmailPhoneSubmit = async (values) => {
    try {
      setLoading(true);

      // Gửi email và phone number để xác minh tài khoản đăng ký
      const response = await authAPI.sendOTP({
        email: values.email,
        phoneNumber: values.phone
      });

      if (response.success) {
        setFormData(prev => ({
          ...prev,
          email: values.email,
          phone: values.phone
        }));
        setCurrentStep(1);
        toast.success(response.message || 'OTP đã được gửi thành công!');

        // Thiết lập thời gian hết hạn OTP (5 phút từ bây giờ)
        const expirationTime = Date.now() + 5 * 60 * 1000; // 5 phút
        setOtpExpiration(expirationTime);
        setIsOtpExpired(false);

        // Reset OTP form khi chuyển step
        otpForm.resetFields();
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi gửi OTP');
      }

    } catch (error) {
      console.error('Error sending OTP:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại!';
      toast.error(errorMessage);

      // Hiển thị lỗi cụ thể cho từng field nếu có
      if (error?.data?.errors) {
        const fieldErrors = [];
        if (error.data.errors.email) {
          fieldErrors.push({ name: 'email', errors: [error.data.errors.email] });
        }
        if (error.data.errors.phone) {
          fieldErrors.push({ name: 'phone', errors: [error.data.errors.phone] });
        }
        emailPhoneForm.setFields(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: OTP Verification
  const handleOtpSubmit = async (values) => {
    try {
      setLoading(true);

      // Verify OTP với code, email, phone
      const response = await authAPI.verifyOTP({
        code: values.otp,
        email: formData.email,
        phone: formData.phone
      });

      if (response.success) {
        setFormData(prev => ({ ...prev, otp: values.otp }));
        setCurrentStep(2);
        toast.success(response.message || 'OTP xác thực thành công!');

        // Reset password form khi chuyển step
        passwordForm.resetFields();
      } else {
        throw new Error(response.message || 'OTP không hợp lệ');
      }

    } catch (error) {
      console.error('Error verifying OTP:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi xác thực OTP. Vui lòng thử lại!';
      toast.error(errorMessage);
      otpForm.setFields([{
        name: 'otp',
        errors: [errorMessage]
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Password Setup và Complete Registration
  const handlePasswordSubmit = async (values) => {
    try {
      setLoading(true);

      // Hoàn thành đăng ký với email, password, phone
      const response = await authAPI.register({
        email: formData.email,
        password: values.password,
        phone: formData.phone
      });

      if (response.success) {
        toast.success(response.message || 'Đăng ký thành công! Chào mừng bạn đến với Cohabit!');

        // Redirect to login sau khi đăng ký thành công
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi đăng ký');
      }

    } catch (error) {
      console.error('Error completing registration:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!';
      toast.error(errorMessage);

      if (error?.data?.errors) {
        const fieldErrors = [];
        if (error.data.errors.password) {
          fieldErrors.push({ name: 'password', errors: [error.data.errors.password] });
        }
        passwordForm.setFields(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      // Gửi lại OTP với email và phone đã lưu
      const response = await authAPI.sendOTP({
        email: formData.email,
        phoneNumber: formData.phone
      });

      if (response.success) {
        // Reset thời gian hết hạn OTP khi gửi lại
        const expirationTime = Date.now() + 5 * 60 * 1000; // 5 phút
        setOtpExpiration(expirationTime);
        setIsOtpExpired(false);

        toast.success(response.message || 'OTP đã được gửi lại thành công!');
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi gửi lại OTP');
      }

    } catch (error) {
      console.error('Error resending OTP:', error);
      const errorMessage = error?.data?.message || error?.message || 'Có lỗi xảy ra khi gửi lại OTP!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const hidePhoneNumber = (phone) => {
    if (!phone) return '';
    return phone.split('').map((char, index) => (index > 2 && index <= 6 ? 'x' : char)).join('');
  };

  // Handle khi OTP hết hạn
  const handleOtpExpire = () => {
    setIsOtpExpired(true);
    toast.warning('Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới!');
  };

  // Handle step click để quay về step trước đó
  const handleStepClick = (stepIndex) => {
    // Chỉ cho phép quay về step trước đó, không cho phép nhảy tới step chưa hoàn thành
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);

      // Reset form của step hiện tại khi quay lại
      if (currentStep === 1) {
        otpForm.resetFields();
      } else if (currentStep === 2) {
        passwordForm.resetFields();
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[100vh]">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 px-2 py-6 lg:px-10 lg:py-auto lg:my-20 sm:py-20 sm:px-20'>

        {/* Image section */}
        <div className="hidden lg:flex items-center justify-center">
          <img
            src={registerImage}
            alt='Register'
            className="w-[320px] h-[320px] lg:w-[510px] lg:h-[510px] object-cover"
          />
        </div>

        {/* Form section */}
        <div className="flex items-start justify-center mt-5">
          <div className="w-full">
            {/* Steps Progress */}
            <div className="mb-8">
              <Steps
                current={currentStep}
                size="small"
                onChange={handleStepClick}
                className="clickable-steps"
              >
                <Step title="Email & Số điện thoại" icon={<MailOutlined />} />
                <Step title="Xác thực OTP" icon={<SafetyOutlined />} />
                <Step title="Tạo mật khẩu" icon={<LockOutlined />} />
              </Steps>
            </div>

            {/* Step 1: Email and Phone Number */}
            {currentStep === 0 && (
              <div className="w-full">
                <Typography.Title level={1} className="text-left mb-6">
                  Cohabit xin chào!
                  <Typography.Text className="block text-left mt-3 text-base">
                    Nhập email và số điện thoại để bắt đầu đăng ký tài khoản
                  </Typography.Text>
                </Typography.Title>

                <Form
                  form={emailPhoneForm}
                  onFinish={handleEmailPhoneSubmit}
                  layout="vertical"
                  requiredMark={false}
                >
                  <Form.Item
                    name="email"
                    rules={[{ validator: registrationValidators.validateEmail }]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder='Email của bạn'
                      size='large'
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[{ validator: registrationValidators.validatePhone }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder='Số điện thoại'
                      size='large'
                      maxLength={11}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full !h-[50px] !text-xl !bg-[#1279a2]"
                      size='large'
                      icon={<ArrowRightOutlined />}
                      iconPosition='end'
                    >
                      Gửi mã OTP
                    </Button>
                  </Form.Item>
                </Form>

                <Typography.Title level={1} className="text-left mb-6 !text-5xl">
                  <Typography.Text className="text-left mt-3 text-base flex justify-start items-center gap-2">
                    Bạn đã có tài khoản Cohabit?
                    <Typography className='text-blue-500'>
                      <Link to={'/login'}>
                        Đăng nhập ngay
                        <RightOutlined className='ml-5 !text-black' />
                      </Link>
                    </Typography>
                  </Typography.Text>
                </Typography.Title>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 1 && (
              <div className="w-full">
                <div className="text-center mb-6">
                  <Typography.Title level={2} className="!mb-2">
                    Nhập mã xác nhận
                  </Typography.Title>

                  <Typography.Text className="text-gray-500">
                    Mã xác nhận đã gửi đến số <span className='text-[#1279a2] font-bold'>
                      {hidePhoneNumber(formData.phone)}
                    </span>
                  </Typography.Text>
                </div>

                <Form
                  form={otpForm}
                  onFinish={handleOtpSubmit}
                  layout="vertical"
                  requiredMark={false}
                >
                  <Form.Item
                    name="otp"
                    rules={[{ validator: registrationValidators.validateOTP }]}
                    className="text-center flex justify-center"
                  >
                    <Input.OTP
                      length={6}
                      size='large'
                      className="!gap-3 flex justify-center"
                      disabled={isOtpExpired}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={isOtpExpired}
                      className="w-full !h-[50px] !text-xl !bg-[#1279a2]"
                      size='large'
                      icon={<ArrowRightOutlined />}
                      iconPosition='end'
                    >
                      Xác thực
                    </Button>
                  </Form.Item>
                </Form>

                <div className="flex items-center justify-between mt-4 mx-2">
                  {/* Left side: Resend button */}
                  <div className="flex items-center">
                    <Typography.Text className="text-gray-500 text-sm mr-2">
                      {isOtpExpired ?
                        'Mã OTP đã hết hạn!' :
                        'Không nhận được mã?'
                      }
                    </Typography.Text>
                    <Button
                      type="link"
                      onClick={handleResendOtp}
                      loading={loading}
                      className="!p-0 !text-sm"
                    >
                      {isOtpExpired ? 'Gửi mã mới' : 'Gửi lại'}
                    </Button>
                  </div>

                  {/* Right side: OTP Countdown Timer */}
                  {otpExpiration && (
                    <div className="text-right">
                      <Statistic.Countdown
                        value={otpExpiration}
                        onFinish={handleOtpExpire}
                        format="mm:ss"
                        valueStyle={{
                          color: isOtpExpired ? '#ff4d4f' : '#1890ff',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                        prefix={
                          <Typography.Text className="text-xs text-gray-500 mr-2">
                            Gửi lại mã:
                          </Typography.Text>
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Password Setup */}
            {currentStep === 2 && (
              <div className="w-full">
                <div className="text-center mb-6">
                  <Typography.Title level={2} className="!mb-2">
                    Tạo mật khẩu
                  </Typography.Title>

                  <Typography.Text className="text-gray-500">
                    Tạo mật khẩu mạnh để bảo vệ tài khoản của bạn
                  </Typography.Text>
                </div>

                <Form
                  form={passwordForm}
                  onFinish={handlePasswordSubmit}
                  layout="vertical"
                  requiredMark={false}
                >
                  <Form.Item
                    name="password"
                    rules={[{ validator: registrationValidators.validatePassword }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder='Nhập mật khẩu'
                      size='large'
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    rules={[{ validator: registrationValidators.validateConfirmPassword(passwordForm) }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder='Xác nhận mật khẩu'
                      size='large'
                    />
                  </Form.Item>

                  <Typography.Text className="block text-left mt-3 text-sm text-gray-500 mb-4">
                    Bằng việc đăng ký tài khoản, tôi đồng ý với{' '}
                    <Typography.Link underline>Điều khoản sử dụng</Typography.Link>
                    {' '}và{' '}
                    <Typography.Link underline>Chính sách bảo mật</Typography.Link>
                    {' '}của Cohabit.
                  </Typography.Text>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full !h-[50px] !text-xl !bg-[#1279a2]"
                      size='large'
                      icon={<ArrowRightOutlined />}
                      iconPosition='end'
                    >
                      Hoàn thành đăng ký
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepRegistration;
