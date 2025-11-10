import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Result, Button, Spin, Alert, message } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { PAYMENT_CONSTANTS } from '../../constants/payment.constant';
import { setUserProfile } from '../../redux/features/user.slice';
import { profileApi } from '../../api/profile.api';

const PremiumPaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasProcessed, setHasProcessed] = useState(false); // Prevent multiple processing
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const { profile } = useSelector(state => state.user);

  // Redirect to login if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const profile = await profileApi.getProfile();
      if (!profile) {
        message.warning('Vui lòng đăng nhập để xem trạng thái thanh toán');
        navigate('/login', { state: { from: '/premium/payment' } });
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Prevent multiple processing of the same payment
      if (hasProcessed) return;

      // Get parameters from URL query string
      const statusParam = searchParams.get('status');
      const cancelParam = searchParams.get('cancel');
      const paymentIdFromUrl = searchParams.get('id'); // PayOS uses 'id' instead of 'paymentId'

      // Mark as processed to prevent re-processing
      setHasProcessed(true);

      // Get payment ID from localStorage or URL
      const paymentId = localStorage.getItem(PAYMENT_CONSTANTS.PENDING_PAYMENT_KEY) || paymentIdFromUrl;

      // If cancelled, redirect back to premium page
      if (cancelParam === 'true' || cancelParam === '1') {
        navigate('/premium');
        return;
      }

      if (!statusParam) {
        // No status in URL, check if we have pending payment
        if (paymentId) {
          setPaymentStatus('checking');
        } else {
          setPaymentStatus('no_payment');
        }
        return;
      }

      // Handle PayOS status values (string based)
      switch (statusParam?.toUpperCase()) {
        case 'PAID':
          // Update user role in Redux
          if (profile) {
            const updatedProfile = await profileApi.getProfile();
            dispatch(setUserProfile(updatedProfile));
          }

          setPaymentStatus('success');
          localStorage.removeItem(PAYMENT_CONSTANTS.PENDING_PAYMENT_KEY);
          break;

        case 'CANCELLED':
        case 'CANCEL':
          setPaymentStatus('cancelled');
          localStorage.removeItem(PAYMENT_CONSTANTS.PENDING_PAYMENT_KEY);
          break;

        case 'FAILED':
        case 'ERROR':
          setPaymentStatus('failed');
          localStorage.removeItem(PAYMENT_CONSTANTS.PENDING_PAYMENT_KEY);
          break;

        case 'PENDING':
          setPaymentStatus('checking');
          break;

        default:
          setPaymentStatus('error');
          setErrorMessage('Trạng thái thanh toán không xác định');
          break;
      }
    };

    if (profile) {
      checkPaymentStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleRetry = () => {
    // Redirect to premium page to try payment again
    navigate('/premium');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoProfile = () => {
    navigate('/profile');
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'checking':
        return (
          <Result
            icon={<Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
            title="Đang kiểm tra thanh toán..."
            subTitle="Vui lòng đợi trong giây lát. Chúng tôi đang xác nhận giao dịch của bạn."
          />
        );

      case 'success':
        return (
          <Result
            status="success"
            icon={<CheckCircleOutlined />}
            title="Thanh toán thành công!"
            subTitle="Chúc mừng! Tài khoản của bạn đã được nâng cấp. Bạn có thể sử dụng tất cả tính năng cao cấp ngay bây giờ."
            extra={[
              <Button key="profile" type="primary" onClick={handleGoProfile}>
                Xem hồ sơ
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      case 'cancelled':
        return (
          <Result
            status="warning"
            title="Thanh toán đã bị hủy"
            subTitle="Giao dịch thanh toán của bạn đã bị hủy. Bạn có thể thử lại bất cứ lúc nào."
            extra={[
              <Button key="retry" type="primary" onClick={() => navigate('/premium')}>
                Thử lại
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      case 'timeout':
        return (
          <Result
            status="info"
            title="Kiểm tra thanh toán quá thời gian"
            subTitle="Chúng tôi không thể xác nhận trạng thái thanh toán trong thời gian quy định. Vui lòng kiểm tra email hoặc liên hệ hỗ trợ."
            extra={[
              <Button key="retry" onClick={handleRetry}>
                Thử lại
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      case 'failed':
        return (
          <Result
            status="error"
            title="Thanh toán thất bại"
            subTitle="Giao dịch thanh toán của bạn đã thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ."
            extra={[
              <Button key="retry" type="primary" onClick={() => navigate('/premium')}>
                Thử lại
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      case 'error':
        return (
          <Result
            status="error"
            title="Lỗi kiểm tra thanh toán"
            subTitle={errorMessage || "Có lỗi xảy ra khi kiểm tra trạng thái thanh toán. Vui lòng thử lại sau."}
            extra={[
              <Button key="retry" onClick={handleRetry}>
                Thử lại
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      case 'no_payment':
        return (
          <Result
            status="warning"
            title="Không tìm thấy thông tin thanh toán"
            subTitle="Không có giao dịch thanh toán nào đang chờ xử lý. Vui lòng quay lại trang premium để tạo thanh toán mới."
            extra={[
              <Button key="premium" type="primary" onClick={() => navigate('/premium')}>
                Đến trang Premium
              </Button>,
              <Button key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {renderContent()}

        {paymentStatus === 'checking' && (
          <div className="mt-6">
            <Alert
              message="Lưu ý"
              description="Vui lòng không đóng trang này cho đến khi quá trình thanh toán hoàn tất."
              type="info"
              showIcon
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumPaymentPage;