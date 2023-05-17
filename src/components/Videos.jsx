import React from 'react';
import VideoCard from './VideoCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Videos() {
  const { videoCategoryId } = useParams();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', `${videoCategoryId}`],
    () => {
      return axios
        .get('/data/most-popular-videos.json')
        .then(res => res.data.items);
    },
    { staleTime: 1000 * 60 * 5 } // 5 min
  );

  if (isLoading) return <p>isLoading</p>;

  if (error) return <p>error</p>;

  return (
    <>
      <p>list of videoCards</p>
      <VideoCard videos={videos} />
    </>
  );
}
