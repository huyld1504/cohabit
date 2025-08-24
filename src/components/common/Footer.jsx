import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const serviceColumns = [
    {
      title: "Dịch vụ",
      items: [
        "Phòng trọ đời thuê phòng",
        "Phần bổ chất phòng",
        "Diễn đàn cộng đồng",
        "Tư chuyển tư động bằng AI"
      ]
    },
    {
      title: "Dịch vụ",
      items: [
        "Phòng trọ đời thuê phòng",
        "Phần bổ chất phòng",
        "Diễn đàn cộng đồng",
        "Tư chuyển tư động bằng AI"
      ]
    },
    {
      title: "Dịch vụ",
      items: [
        "Phòng trọ đời thuê phòng",
        "Phần bổ chất phòng",
        "Diễn đàn cộng đồng",
        "Tư chuyển tư động bằng AI"
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo và Hỗ trợ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600">
                <span className="text-blue-600">COH</span>
                <span className="inline-block w-8 h-8 bg-blue-600 rounded-sm mx-1 relative">
                  <span className="absolute top-1 left-1 w-6 h-6 bg-white rounded-sm"></span>
                </span>
                <span className="text-blue-600">BIT</span>
              </div>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỗ trợ</h3>
              <div className="space-y-2 text-gray-800">
                <p>Hotline: 1900 000 000</p>
                <p>Hỗ trợ kỹ thuật hàng: Cohabit.tn@gmail.com</p>
                <p>Liên hệ hợp tác: Cohabit.tn@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Service Columns */}
          {serviceColumns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-black-600">{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to="#"
                      className="text-gray-800 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Copyright Bar */}
      <disv className="bg-blue-600 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white text-sm font-medium">
              © 2025, Cohabit
            </p>
          </div>
        </div>
      </disv>
    </footer>
  );
};

export default Footer;