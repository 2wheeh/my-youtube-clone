import React from 'react';
import VideoCard from './VideoCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { videoCategoryId, channelId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', `${videoCategoryId}`],
    () => youtube.mostPopularVideos(videoCategoryId),
    { staleTime: 1000 * 60 * 5 } // 5 min
  );

  if (isLoading) return <p>isLoading</p>;

  if (error) return <p>error</p>;

  return (
    <>
      <p>list of videoCards</p>
      <p>categoryId : {videoCategoryId}</p>
      {videos.map(video => (
        <VideoCard video={video} key={video.id} />
      ))}
    </>
  );
}
