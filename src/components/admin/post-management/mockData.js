// Mock data for post management
export const mockPostData = [
  {
    id: 1,
    title: 'Phòng trọ gần làng đại học',
    description: 'Gần làng đại học quận 9 và có có tiện ích đầy đủ, an ninh tốt, giá cả phải chăng',
    thumbnail: '/images/posts/welcome.jpg',
    author: {
      name: 'Nguyễn Văn A',
      avatar: null
    },
    category: 'Công nghiệp',
    status: 'Chờ duyệt',
    createdDate: '15/01/2024',
    views: 1250
  },
  {
    id: 2,
    title: 'Phòng trọ Q2',
    description: 'Khu dân cư trung tâm quận 2 với đầy đủ tiện nghi hiện đại',
    thumbnail: '/images/posts/post2.jpg',
    author: {
      name: 'Trần Thị B',
      avatar: null
    },
    category: 'Ẩm thực',
    status: 'Đã xuất bản',
    createdDate: '14/01/2024',
    views: 2150
  },
  {
    id: 3,
    title: 'Phòng trọ Sala',
    description: 'Cho thuê phòng trọ giá rẻ, vị trí thuận tiện giao thông',
    thumbnail: '/images/posts/post3.jpg',
    author: {
      name: 'Lê Văn C',
      avatar: null
    },
    category: 'Du lịch',
    status: 'Bị từ chối',
    createdDate: '13/01/2024',
    views: 890
  },
  {
    id: 4,
    title: 'Phòng trọ cao cấp Thủ Đức',
    description: 'Phòng trọ mới xây, đầy đủ nội thất, gần trường đại học',
    thumbnail: '/images/posts/post4.jpg',
    author: {
      name: 'Phạm Minh D',
      avatar: null
    },
    category: 'Bất động sản',
    status: 'Đã xuất bản',
    createdDate: '12/01/2024',
    views: 3200
  },
  {
    id: 5,
    title: 'Homestay gần biển Vũng Tàu',
    description: 'Căn hộ view biển tuyệt đẹp, thích hợp cho gia đình và nhóm bạn',
    thumbnail: '/images/posts/post5.jpg',
    author: {
      name: 'Võ Thị E',
      avatar: null
    },
    category: 'Du lịch',
    status: 'Chờ duyệt',
    createdDate: '11/01/2024',
    views: 1750
  },
];

export const mockPostStats = {
  totalPosts: 1247,
  pendingPosts: 23,
  publishedPosts: 1198,
  rejectedPosts: 26,
};
