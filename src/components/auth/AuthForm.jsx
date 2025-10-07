import { welcomeImage } from '../../assets/index';
import { Button, Form, Input, Typography } from 'antd';
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/features/auth.slice';
import { authAPI } from '../../api/auth.api';
import { profileApi } from '../../api/profile.api';
import { setToken } from '../../utils/token.store.util';
import { toast } from 'react-toastify';
import { setUserProfile } from '../../redux/features/user.slice';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      // Prevent any potential form reload
      dispatch(loginStart());

      // Prepare login data theo format yêu cầu
      const loginData = {
        phone: values.phone,
        password: values.password
      };

      // Call login API
      const response = await authAPI.login(loginData);

      if (response && response.success && response.data) {
        // Lưu accessToken và refreshToken vào localStorage
        if (response.data.accessToken && response.data.refreshToken) {
          setToken(response.data.accessToken, response.data.refreshToken);
        }

        const profileResponse = await profileApi.getProfile();
        if (profileResponse) {
          // Dispatch success action với user data và token
          await Promise.all([
            dispatch(loginSuccess({
            token: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })),
          dispatch(setUserProfile(profileResponse))
          ]);
          
          // Hiển thị toast success với message từ API
          toast.success(response.message || 'Đăng nhập thành công!');
          // Navigate to home
          navigate('/');
        } else {
          // Nếu không lấy được profile
          dispatch(loginFailure('Không thể lấy thông tin người dùng!'));
          toast.error('Không thể lấy thông tin người dùng!');
        }
      } else {
        // Handle case khi success = false
        const errorMessage = response?.message || 'Đăng nhập thất bại!';
        console.log(errorMessage);
        dispatch(loginFailure(errorMessage));
        toast.error(errorMessage);
      }
    } catch (error) {
      // Prevent any potential navigation or reload
      try {
        // Handle different error types
        const errorMessage = error.response?.data?.message ||
          error.message ||
          'Đăng nhập thất bại. Vui lòng thử lại!';

        dispatch(loginFailure(errorMessage));
        toast.error(errorMessage);
      } catch (innerError) {
        dispatch(loginFailure(innerError.message));
        toast.error(innerError.message);
      }
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto min-h-[100vh]">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 px-2 py-6 lg:px-10 lg:py-auto lg:my-20 sm:py-20 sm:px-20'>
        {/* Image section */}
        <div className="hidden lg:flex items-center justify-center">
          <img src={welcomeImage} alt={'login'} className="w-[320px] h-[320px] lg:w-[510px] lg:h-[510px] object-cover" />
        </div>

        {/* Form section */}
        <div className="flex items-center justify-center">
          <Form
            form={form}
            name={'Login'}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            className="w-full min-h-full"
            onFinish={ handleLogin }
          >
            <Typography.Title level={1} className="text-left mb-6">
              Cohabit xin chào!
              <Typography.Text className="block text-left mt-3 text-base">
                Đăng nhập để tìm phòng trọ ưng ý với những ưu đãi độc quyền dành cho thành viên.
              </Typography.Text>
            </Typography.Title>

            <Form.Item
              name="phone"
              className='w-full'
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
              ]}
            >
              <Input
                type='text'
                placeholder='Số điện thoại'
                size='large'
                className='w-full'
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="password"
              className='w-full'
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password
                placeholder='Mật khẩu'
                size='large'
                className='w-full'
                disabled={loading}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="w-full !h-[50px] !text-xl !bg-[#1279a2] !text-white"
                size='large'
                icon={!loading && <ArrowRightOutlined />}
                iconPosition='end'
              >
                {loading ? 'Đang đăng nhập...' : 'Xác nhận'}
              </Button>
            </Form.Item>

            <Typography.Title level={1} className="text-left mb-6 !text-5xl">
              <Typography.Text className="text-left mt-3 text-base flex justify-start items-center gap-2">
                Bạn chưa có tài khoản?
                <Typography className='text-blue-500'>
                  <Link to={'/register'}>
                    Đăng ký ngay
                    <RightOutlined className='ml-5 !text-black' />
                  </Link>
                </Typography>
              </Typography.Text>
            </Typography.Title>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;