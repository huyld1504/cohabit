import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, Steps, message, Form, Statistic } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, PhoneOutlined, SafetyOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { registerImage } from '../../assets';
import mockRegistrationService, { showDemoGuide } from '../../services/mockRegistrationService';
import { registrationValidators } from '../../schemas/registrationSchemas';

const { Step } = Steps;

const StepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
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
  const [phoneForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Show demo guide on component mount
  useEffect(() => {
    showDemoGuide();
  }, []);

  // Step 1: Phone Number Input
  const handlePhoneSubmit = async (values) => {
    try {
      setLoading(true);

      // Sử dụng mock service để gửi OTP
      const response = await mockRegistrationService.sendOTP(values.phone);

      setFormData(prev => ({ ...prev, phone: values.phone }));
      setCurrentStep(1);
      message.success(response.message);

      // Thiết lập thời gian hết hạn OTP (5 phút từ bây giờ)
      const expirationTime = Date.now() + 5 * 60 * 1000; // 5 phút
      setOtpExpiration(expirationTime);
      setIsOtpExpired(false);

      // Reset OTP form khi chuyển step
      otpForm.resetFields();

    } catch (error) {
      console.error('Error sending OTP:', error);
      message.error(error.message || 'Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại!');
      phoneForm.setFields([{
        name: 'phone',
        errors: [error.message]
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: OTP Verification
  const handleOtpSubmit = async (values) => {
    try {
      setLoading(true);

      // Sử dụng mock service để xác thực OTP
      const response = await mockRegistrationService.verifyOTP(formData.phone, values.otp);

      setFormData(prev => ({ ...prev, otp: values.otp }));
      setCurrentStep(2);
      message.success(response.message);

      // Reset password form khi chuyển step
      passwordForm.resetFields();

    } catch (error) {
      console.error('Error verifying OTP:', error);
      message.error(error.message || 'Có lỗi xảy ra khi xác thực OTP. Vui lòng thử lại!');
      otpForm.setFields([{
        name: 'otp',
        errors: [error.message]
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Password Setup
  const handlePasswordSubmit = async (values) => {
    try {
      setLoading(true);

      // Sử dụng mock service để hoàn thành đăng ký
      const response = await mockRegistrationService.completeRegistration(
        formData.phone,
        values.password
      );

      message.success(response.message + ' Chào mừng bạn đến với Cohabit!');

      // Log thông tin user mới đăng ký
      console.log('✅ Registration completed:', response.user);
      console.log('📊 All registered users:', mockRegistrationService.getRegisteredUsers());

      // Redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      console.error('Error completing registration:', error);
      message.error(error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
      passwordForm.setFields([{
        name: 'password',
        errors: [error.message]
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      // Sử dụng mock service để gửi lại OTP
      const response = await mockRegistrationService.resendOTP(formData.phone);

      // Reset thời gian hết hạn OTP khi gửi lại
      const expirationTime = Date.now() + 5 * 60 * 1000; // 5 phút
      setOtpExpiration(expirationTime);
      setIsOtpExpired(false);

      message.success(response.message);

    } catch (error) {
      console.error('Error resending OTP:', error);
      message.error(error.message || 'Có lỗi xảy ra khi gửi lại OTP!');
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
    message.warning('Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới!');
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
        <div className="flex items-center justify-center">
          <div className="w-full">
            {/* Steps Progress */}
            <div className="mb-8">
              <Steps
                current={currentStep}
                size="small"
                onChange={handleStepClick}
                className="clickable-steps"
              >
                <Step title="Số điện thoại" icon={<PhoneOutlined />} />
                <Step title="Xác thực OTP" icon={<SafetyOutlined />} />
                <Step title="Tạo mật khẩu" icon={<LockOutlined />} />
              </Steps>
            </div>

            {/* Step 1: Phone Number */}
            {currentStep === 0 && (
              <div className="w-full">
                <Typography.Title level={1} className="text-left mb-6">
                  Cohabit xin chào!
                  <Typography.Text className="block text-left mt-3 text-base">
                    Nhập số điện thoại để bắt đầu đăng ký tài khoản
                  </Typography.Text>
                </Typography.Title>

                <Form
                  form={phoneForm}
                  onFinish={handlePhoneSubmit}
                  layout="vertical"
                  requiredMark={false}
                >
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