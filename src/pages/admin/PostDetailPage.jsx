import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Space, Card, Tag, Avatar, Divider, Spin, Modal, Select } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined, DollarOutlined, EditOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AdminPaper from '../../components/admin/AdminPaper';
import ImageGallery from '../../components/properties/detail/ImageGallery';
import SafeHTMLRenderer from '../../components/common/SafeHTMLRenderer';
import { postApi } from '../../api/post.api';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPostDetail = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postApi.getPostDetail(postId);
      if (response.success) {
        setPost(response.data);
      } else {
        toast.error('Không thể tải chi tiết bài đăng!');
      }
    } catch (error) {
      console.error('Error fetching post detail:', error);
      toast.error('Lỗi khi tải chi tiết bài đăng!');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchPostDetail();
    }
  }, [postId, fetchPostDetail]);

  const getStatusTag = (status) => {
    switch (status) {
      case 0:
        return <Tag color="orange">Đang chờ duyệt</Tag>;
      case 1:
        return <Tag color="green">Đang hoạt động</Tag>;
      case 2:
        return <Tag color="red">Đã từ chối</Tag>;
      case 3:
        return <Tag color="default">Đã đóng</Tag>;
      case 4:
        return <Tag color="purple">Đã ẩn</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    const statusLabels = {
      0: 'Đang chờ duyệt',
      1: 'Đang hoạt động',
      2: 'Đã từ chối',
      3: 'Đã đóng',
      4: 'Đã ẩn'
    };

    Modal.confirm({
      title: 'Cập nhật trạng thái bài đăng',
      content: `Bạn có chắc chắn muốn thay đổi trạng thái bài đăng thành "${statusLabels[newStatus]}"?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okType: 'primary',
      onOk: async () => {
        try {
          const response = await postApi.updateStatusPost(postId, newStatus);
          if (response.success) {
            toast.success(`Đã cập nhật trạng thái thành "${statusLabels[newStatus]}"!`);
            // Refresh post data
            fetchPostDetail();
          } else {
            toast.error('Không thể cập nhật trạng thái bài đăng!');
          }
        } catch (error) {
          console.error('Error updating post status:', error);
          toast.error('Lỗi khi cập nhật trạng thái bài đăng!');
        }
      },
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <AdminPaper
        title="Chi tiết bài đăng"
        subtitle="Đang tải thông tin..."
      >
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Đang tải chi tiết bài đăng...</p>
          </div>
        </div>
      </AdminPaper>
    );
  }

  if (!post) {
    return (
      <AdminPaper
        title="Chi tiết bài đăng"
        subtitle="Không tìm thấy bài đăng"
      >
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Không tìm thấy bài đăng</p>
          <Button onClick={() => navigate('/admin/posts-management')} icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </div>
      </AdminPaper>
    );
  }

  return (
    <AdminPaper
      title={post.title}
      subtitle={`${post.address} • ${formatPrice(post.price)}`}
      headerAction={
        <Space>
          <Button onClick={() => navigate('/admin/posts-management')} icon={<ArrowLeftOutlined />}>
            Quay lại danh sách
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
          <Select
            value={post.status}
            onChange={handleUpdateStatus}
            style={{ width: 140 }}
            placeholder="Chọn trạng thái"
          >
            <Select.Option value={0}>Đang chờ duyệt</Select.Option>
            <Select.Option value={1}>Đang hoạt động</Select.Option>
            <Select.Option value={2}>Đã từ chối</Select.Option>
            <Select.Option value={3}>Đã đóng</Select.Option>
            <Select.Option value={4}>Đã ẩn</Select.Option>
          </Select>
        </Space>
      }
    >
      {/* Main Content */}
      <Row gutter={[24, 24]} className="w-full">
        {/* Left Column - Images and Details */}
        <Col xs={24} lg={16} className="w-full">
          <Space direction="vertical" size="large" className="w-full">
            {/* Image Gallery */}
            <Card className="shadow-sm p-0">
              <ImageGallery images={post.imageUrl || []} />
            </Card>

            {/* Post Information */}
            <Card className="shadow-sm">
              <div className="space-y-6">
                {/* Description */}
                {post.description && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Mô tả</h3>
                    <div className="text-gray-700 leading-relaxed">
                      <SafeHTMLRenderer htmlContent={post.description} />
                    </div>
                  </div>
                )}

                {/* Condition */}
                {post.condition && (
                  <>
                    <Divider />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tình trạng phòng</h3>
                      <div className="text-gray-700 leading-relaxed">
                        <SafeHTMLRenderer htmlContent={post.condition} />
                      </div>
                    </div>
                  </>
                )}

                {/* Deposit Policy */}
                {post.depositPolicy && (
                  <>
                    <Divider />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Chính sách đặt cọc</h3>
                      <div className="text-gray-700 leading-relaxed">
                        <SafeHTMLRenderer htmlContent={post.depositPolicy} />
                      </div>
                    </div>
                  </>
                )}

                {/* Furniture List */}
                {post.furnitures && post.furnitures.length > 0 && (
                  <>
                    <Divider />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tiện nghi có sẵn</h3>
                      <Space wrap>
                        {post.furnitures.map((item) => (
                          <Tag key={item.furId} color="blue" className="text-sm">
                            {item.name}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </Space>
        </Col>

        {/* Right Column - Post Info and User Info */}
        <Col xs={24} lg={8} className="w-full">
          <div className="lg:sticky lg:top-6 !space-y-6 mt-6 lg:mt-0">
            {/* Post Quick Info */}
            <Card className="shadow-sm">
              <Space direction="vertical" size="middle" className="w-full">
                <h3 className="text-lg font-semibold text-gray-800">Thông tin bài đăng</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ID bài đăng:</span>
                    <span className="font-mono text-sm">{post.postId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạng thái:</span>
                    {getStatusTag(post.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giá thuê:</span>
                    <span className="font-semibold text-green-600">{formatPrice(post.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số ảnh:</span>
                    <span>{post.imageUrl?.length || 0}</span>
                  </div>
                </div>
              </Space>
            </Card>

            {/* User Information */}
            <Card className="shadow-sm">
              <Space direction="vertical" size="middle" className="w-full">
                <h3 className="text-lg font-semibold text-gray-800">Thông tin người đăng</h3>
                <div className="flex items-center !space-x-4">
                  <Avatar
                    size={64}
                    src={post.user.avatarUrl || null}
                    icon={<UserOutlined />}
                    className="border-2 border-gray-200 !bg-[#1279a1]"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {post.user.firstName} {post.user.lastName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">ID: {post.user.userId}</p>
                    <div className="flex items-center text-blue-600">
                      <PhoneOutlined className="mr-2" />
                      <span className="font-medium">{post.user.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </Space>
            </Card>

            {/* Admin Actions */}
            <Card className="shadow-sm">
              <Space direction="vertical" size="middle" className="w-full">
                <h3 className="text-lg font-semibold text-gray-800">Quản lý bài đăng</h3>
                <Space direction="vertical" size="middle" className="w-full">
                  <Button type="primary" block icon={<EditOutlined />}>
                    Chỉnh sửa bài đăng
                  </Button>
                  <Button block>
                    Gửi thông báo cho người đăng
                  </Button>
                  <Button block icon={<EyeInvisibleOutlined />} onClick={() => handleUpdateStatus(4)}>
                    Ẩn bài đăng
                  </Button>
                </Space>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </AdminPaper>
  );
};

export default PostDetailPage;