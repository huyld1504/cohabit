import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import AdminPaper from '../../components/admin/AdminPaper';
import { PaymentTable } from '../../components/admin/payment-management';
import { paymentAPI } from '../../api/payment.api';

const RentalHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Fetch payments từ API
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getAllPayments();

      if (response) {
        // Sử dụng response trực tiếp từ API
        const paymentsWithKey = response.map((payment, index) => ({
          ...payment,
          key: payment.subcriptionId || index // Thêm key để Table hoạt động
        }));

        setPayments(paymentsWithKey);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      message.error('Không thể tải danh sách thanh toán');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record) => {
    console.log('View payment:', record);
    message.info(`Xem chi tiết thanh toán SUB${record.subcriptionId}`);
  };

  const handleEdit = (record) => {
    console.log('Edit payment:', record);
    message.info(`Chỉnh sửa thanh toán SUB${record.subcriptionId}`);
  };

  const handleDelete = (record) => {
    console.log('Delete payment:', record);
    setPayments(payments.filter(payment => payment.key !== record.key));
    message.success(`Đã xóa thanh toán ${record.subcriptionId}`);
  };

  // Load data khi component mount
  useEffect(() => {
    fetchPayments();
  }, []); return (
    <AdminPaper
      title="Quản lý thanh toán"
      subtitle="Quản lý các giao dịch thanh toán premium"
    >
      {/* Main Content */}
      <Card bordered={false}>
        {/* Table */}
        <PaymentTable
          data={payments}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </AdminPaper>
  );
};

export default RentalHistoryPage;
