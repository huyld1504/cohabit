import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets';

const Footer = ({ variant = 'default' }) => {
  const isPremium = variant === 'premium';

  // Different content for premium vs default
  const serviceColumns = isPremium ? [
    {
      title: "Liên kết",
      items: [
        { label: "Trang chủ", path: "/" },
        { label: "Về chúng tôi", path: "/about" },
        { label: "Danh mục nhà trọ", path: "/properties" },
        { label: "Mẫu hợp đồng", path: "/contracts" },
        { label: "Liên hệ", path: "/contact" }
      ]
    },
    {
      title: "Hỗ trợ",
      items: [
        { label: "Trung tâm hỗ trợ", path: "/support" },
        { label: "Hướng dẫn sử dụng", path: "/guide" },
        { label: "Câu hỏi thường gặp", path: "/faq" },
        { label: "Báo cáo sự cố", path: "/report" },
        { label: "Đánh giá ứng dụng", path: "/review" }
      ]
    },
    {
      title: "Điều khoản",
      items: [
        { label: "Điều khoản sử dụng", path: "/terms" },
        { label: "Chính sách bảo mật", path: "/privacy" },
        { label: "Chính sách cookie", path: "/cookies" },
        { label: "Quy định cộng đồng", path: "/community" },
        { label: "Khiếu nại và tranh chấp", path: "/disputes" }
      ]
    }
  ] : [
    {
      title: "Dịch vụ",
      items: [
        { label: "Phòng trọ đời thuê phòng", path: "#" },
        { label: "Phần bổ chất phòng", path: "#" },
        { label: "Diễn đàn cộng đồng", path: "#" },
        { label: "Tư chuyển tư động bằng AI", path: "#" }
      ]
    },
    {
      title: "Dịch vụ",
      items: [
        { label: "Phòng trọ đời thuê phòng", path: "#" },
        { label: "Phần bổ chất phòng", path: "#" },
        { label: "Diễn đàn cộng đồng", path: "#" },
        { label: "Tư chuyển tư động bằng AI", path: "#" }
      ]
    },
    {
      title: "Dịch vụ",
      items: [
        { label: "Phòng trọ đời thuê phòng", path: "#" },
        { label: "Phần bổ chất phòng", path: "#" },
        { label: "Diễn đàn cộng đồng", path: "#" },
        { label: "Tư chuyển tư động bằng AI", path: "#" }
      ]
    }
  ];

  const footerStyles = isPremium
    ? "bg-gradient-to-b from-transparent to-black/20 pt-16 pb-8"
    : "bg-gradient-to-r from-blue-50 to-blue-100 mt-16";

  const textStyles = isPremium
    ? "text-white"
    : "text-gray-900";

  const linkStyles = isPremium
    ? "text-white/70 hover:text-white"
    : "text-gray-800 hover:text-blue-600";

  const copyrightStyles = isPremium
    ? "border-t border-white/20 pt-8"
    : "bg-[#1279a2] py-3";

  return (
    <footer className={footerStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo và Hỗ trợ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              {isPremium ? (
                <img src={logo} alt="CoHabit" className="h-10 w-auto" />
              ) : (
                <div className="text-3xl font-bold text-blue-600">
                  <span className="text-blue-600">COH</span>
                  <span className="inline-block w-8 h-8 bg-blue-600 rounded-sm mx-1 relative">
                    <span className="absolute top-1 left-1 w-6 h-6 bg-white rounded-sm"></span>
                  </span>
                  <span className="text-blue-600">BIT</span>
                </div>
              )}
            </div>

            {/* Company description for premium */}
            {isPremium && (
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Nền tảng kết nối người tìm trọ và chủ nhà hiện đại,
                giúp việc tìm kiếm và cho thuê nhà trọ trở nên dễ dàng hơn bao giờ hết.
              </p>
            )}

            {/* Hỗ trợ */}
            {!isPremium && (
              <div>
                <h3 className={`text-lg font-semibold ${textStyles} mb-4`}>Hỗ trợ</h3>
                <div className={`space-y-2 ${linkStyles}`}>
                  <p>Hotline: 1900 000 000</p>
                  <p>Hỗ trợ kỹ thuật hàng: Cohabit.tn@gmail.com</p>
                  <p>Liên hệ hợp tác: Cohabit.tn@gmail.com</p>
                </div>
              </div>
            )}
          </div>

          {/* Service Columns */}
          {serviceColumns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className={`text-lg font-semibold ${textStyles}`}>{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.path || "#"}
                      className={`${linkStyles} transition-colors duration-200 text-sm`}
                    >
                      {item.label || item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={copyrightStyles}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={isPremium ? "flex flex-col md:flex-row justify-between items-center" : "text-center"}>
            <div className={`${isPremium ? "text-white/60" : "text-white"} text-sm ${isPremium ? "mb-4 md:mb-0" : "font-medium"}`}>
              "© 2025, Cohabit"
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;