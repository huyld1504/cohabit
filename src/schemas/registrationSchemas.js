import * as Yup from 'yup';

// Validation functions for Ant Design Form
export const registrationValidators = {
  // Email validator
  validateEmail: (_, value) => {
    const emailSchema = Yup.string()
      .required('Vui lòng nhập email!')
      .email('Email không hợp lệ!')
      .max(100, 'Email không được quá 100 ký tự');

    try {
      emailSchema.validateSync(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },

  // Phone validator
  validatePhone: (_, value) => {
    const phoneSchema = Yup.string()
      .required('Vui lòng nhập số điện thoại!')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ!')
      .min(10, 'Số điện thoại phải có ít nhất 10 số')
      .max(11, 'Số điện thoại không được quá 11 số');

    try {
      phoneSchema.validateSync(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },

  // OTP validator
  validateOTP: (_, value) => {
    const otpSchema = Yup.string()
      .required('Vui lòng nhập mã OTP!')
      .matches(/^\d{6}$/, 'Mã OTP phải có đúng 6 số')
      .length(6, 'Mã OTP phải có 6 số');

    try {
      otpSchema.validateSync(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },

  // Password validator
  validatePassword: (_, value) => {
    const passwordSchema = Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(50, 'Mật khẩu không được quá 50 ký tự')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số');

    try {
      passwordSchema.validateSync(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },

  // Confirm password validator - needs access to form instance
  validateConfirmPassword: (form) => (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng xác nhận mật khẩu!'));
    }

    const password = form.getFieldValue('password');
    if (password !== value) {
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
    }

    return Promise.resolve();
  },
};

// Keep original schemas for reference (can be removed later)
export const registrationSchemas = {
  // Step 1: Phone validation
  phoneSchema: Yup.object().shape({
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại!')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ!')
      .min(10, 'Số điện thoại phải có ít nhất 10 số')
      .max(11, 'Số điện thoại không được quá 11 số')
  }),

  // Step 2: OTP validation  
  otpSchema: Yup.object().shape({
    otp: Yup.string()
      .required('Vui lòng nhập mã OTP!')
      .matches(/^\d{6}$/, 'Mã OTP phải có đúng 6 số')
      .length(6, 'Mã OTP phải có 6 số')
  }),

  // Step 3: Password validation
  passwordSchema: Yup.object().shape({
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(50, 'Mật khẩu không được quá 50 ký tự')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số (tùy chọn - có thể tắt)'
      ),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu!')
      .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp!')
  }),

  // Simplified password schema (không yêu cầu phức tạp)
  simplePasswordSchema: Yup.object().shape({
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(50, 'Mật khẩu không được quá 50 ký tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu!')
      .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp!')
  })
};

// Initial values cho từng form
export const initialValues = {
  phone: {
    phone: ''
  },
  otp: {
    otp: ''
  },
  password: {
    password: '',
    confirmPassword: ''
  }
};

export default registrationSchemas;