export const PAYMENT_PACKAGES = {
  PLUS: {
    name: 'Plus',
    amount: 3000, // VND
    displayPrice: '30.000đ',
    period: '/tháng',
    features: [
      'Đăng tin tìm kiếm bạn phòng',
      'Tìm kiếm nâng cao với bộ lọc chi tiết',
      'Nhận thông báo tin mới qua email',
      'Lưu danh sách yêu thích',
      'Liên hệ trực tiếp với chủ nhà'
    ]
  },
  PRO: {
    name: 'Pro',
    amount: 1000, // VND
    displayPrice: '80.000đ',
    period: '/tháng',
    features: [
      'Tất cả tính năng của gói Plus',
      'Đăng nhiều tin cho thuê cùng lúc',
      'Tin đăng ưu tiên hiển thị trên đầu',
      'Công cụ quản lý phòng trọ chuyên nghiệp',
      'Báo cáo thống kê chi tiết',
      'Hỗ trợ khách hàng ưu tiên 24/7',
      'Tích hợp chatbot thông minh',
      'Quản lý hợp đồng và thanh toán'
    ]
  }
};

export const PAYMENT_STATUS = {
  SUCCESS: 1,
  FAILED: 2,
  IN_PROGRESS: 3,
  CANCELLED: 4
};

export const PAYMENT_CONSTANTS = {
  PENDING_PAYMENT_KEY: 'pendingPaymentId',
  PAYMENT_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  CHECK_INTERVAL: 5000 // 5 seconds
};