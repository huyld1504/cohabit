import React from 'react';
import { useParams } from 'react-router-dom';
import RentedPostDetail from '../../components/user-posts/rental/RentedPostDetail';

const RentedPostDetailPage = () => {
  const { id } = useParams();

  // TODO: Fetch post data based on id
  // const [postData, setPostData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchRentedPostDetail(id);
  // }, [id]);

  return <RentedPostDetail postId={id} />;
};

export default RentedPostDetailPage;