import React from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideoCard from '../components/RelatedVideoCard';

export default function Watch() {
  const { videoId } = useParams();
  return (
    <>
      <p>videoId : {videoId}</p>
      <div>
        <RelatedVideoCard />
      </div>
    </>
  );
}
