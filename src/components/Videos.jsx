import React from 'react';
import VideoCard from './VideoCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import LoadingCard from './LoadingCard';

export default function Videos() {
  const { videoCategoryId, channelId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', `${videoCategoryId}`],
    () => youtube.getMostPopularVideos(videoCategoryId),

    { staleTime: 1000 * 60 * 5 } // 5 min
  );

  if (isLoading || error)
    return (
      <ul className="grid grid-cols-1 px-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
        {Array(25).map(() => (
          <LoadingCard />
        ))}
      </ul>
    );

  return (
    <ul className="grid grid-cols-1 px-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
      {videos.map(video => (
        <VideoCard video={video} key={video.id} />
      ))}
    </ul>
  );
}
