import React from 'react';
import { useParams , useLocation} from 'react-router-dom';
import RelatedVideoCard from '../components/RelatedVideoCard';

export default function Watch() {
  const { videoId } = useParams();
  const location = useLocation();
  const {thumbnailURL} = location.state

  return (
    <>
      <p>videoId : {videoId}재생하겠습니다</p>
      <div>
        <RelatedVideoCard thumbnailURL = {thumbnailURL} />
      </div>
    </>
  );
}
