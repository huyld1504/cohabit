// Mock data và service cho demo registration
export const mockRegistrationData = {
  // Danh sách số điện thoại hợp lệ để test
  validPhones: [
    '0987654321',
    '0123456789',
    '0901234567',
    '0912345678',
    '0934567890'
  ],

  // OTP cố định cho demo
  demoOTP: '123456',

  // Thời gian chờ OTP (giây)
  otpWaitTime: 60,

  // Database mock để lưu user đã đăng ký
  registeredUsers: [
    {
      id: 1,
      phone: '0987654321',
      password: 'password123',
      registeredAt: '2024-12-20T10:30:00Z',
      status: 'active'
    }
  ]
};

// Mock API service
export const mockRegistrationService = {

  // Gửi OTP
  sendOTP: async (phone) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Kiểm tra số điện thoại đã đăng ký chưa
        const existingUser = mockRegistrationData.registeredUsers.find(
          user => user.phone === phone
        );

        if (existingUser) {
          reject(new Error('Số điện thoại này đã được đăng ký!'));
          return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
          reject(new Error('Số điện thoại không hợp lệ!'));
          return;
        }

        console.log(`📱 Mock SMS sent to ${phone}: Your OTP is ${mockRegistrationData.demoOTP}`);
        resolve({
          success: true,
          message: 'OTP đã được gửi thành công!',
          phone: phone,
          otpExpiry: new Date(Date.now() + 5 * 60 * 1000) // 5 phút
        });
      }, 1000); // Giả lập delay API
    });
  },

  // Xác thực OTP
  verifyOTP: async (phone, otp) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === mockRegistrationData.demoOTP) {
          resolve({
            success: true,
            message: 'Xác thực OTP thành công!',
            token: 'temp_verification_token_' + Date.now()
          });
        } else {
          reject(new Error('Mã OTP không chính xác!'));
        }
      }, 800);
    });
  },

  // Hoàn thành đăng ký
  completeRegistration: async (phone, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Kiểm tra mật khẩu
        if (password.length < 6) {
          reject(new Error('Mật khẩu phải có ít nhất 6 ký tự!'));
          return;
        }

        // Tạo user mới
        const newUser = {
          id: mockRegistrationData.registeredUsers.length + 1,
          phone: phone,
          password: password,
          registeredAt: new Date().toISOString(),
          status: 'active'
        };

        // Thêm vào "database"
        mockRegistrationData.registeredUsers.push(newUser);

        console.log('🎉 New user registered:', newUser);
        console.log('📊 Total registered users:', mockRegistrationData.registeredUsers.length);

        resolve({
          success: true,
          message: 'Đăng ký thành công!',
          user: {
            id: newUser.id,
            phone: newUser.phone,
            registeredAt: newUser.registeredAt
          }
        });
      }, 1200);
    });
  },

  // Gửi lại OTP
  resendOTP: async (phone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`📱 Mock SMS resent to ${phone}: Your new OTP is ${mockRegistrationData.demoOTP}`);
        resolve({
          success: true,
          message: 'Mã OTP mới đã được gửi!',
          phone: phone,
          otpExpiry: new Date(Date.now() + 5 * 60 * 1000)
        });
      }, 800);
    });
  },

  // Hàm helper để xem danh sách user đã đăng ký (cho debug)
  getRegisteredUsers: () => {
    return mockRegistrationData.registeredUsers;
  },

  // Reset data (cho test)
  resetData: () => {
    mockRegistrationData.registeredUsers = [
      {
        id: 1,
        phone: '0987654321',
        password: 'password123',
        registeredAt: '2024-12-20T10:30:00Z',
        status: 'active'
      }
    ];
    console.log('🔄 Mock data reset!');
  }
};

// Hàm helper để hiển thị hướng dẫn demo
export const showDemoGuide = () => {
  console.group('🚀 DEMO REGISTRATION GUIDE');
  console.log('📱 Số điện thoại để test:', mockRegistrationData.validPhones);
  console.log('🔐 OTP demo:', mockRegistrationData.demoOTP);
  console.log('💡 Bạn có thể sử dụng bất kỳ số điện thoại nào có định dạng hợp lệ');
  console.log('📊 Users đã đăng ký:', mockRegistrationData.registeredUsers.length);
  console.groupEnd();
};

export default mockRegistrationService;