import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function VideoCard({ video }) {
  const { id: videoId } = video;
  const { publishedAt, title, channelId, channelTitle } = video.snippet;
  const { duration } = video.contentDetails;
  const { viewCount } = video.statistics;
  const { url: thumbnailURL } = video.snippet.thumbnails.medium;

  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/watch/${videoId}`);
  };
  const handleClickChannel = e => {
    e.stopPropagation();
    return navigate(`/channel/${channelId}`);
  };

  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: channel,
  } = useQuery(['channel', `${channelId}`], () =>
    youtube.getChannel(channelId)
  );

  if (isLoading) return <p>isLoading</p>;

  if (error) return <p>error</p>;

  return (
    <div>
      <img onClick={handleClick} src={thumbnailURL} alt={title} />
      <div onClick={handleClick}>
        <img
          onClick={handleClickChannel}
          src={channel[0].snippet.thumbnails.default.url}
          alt={channelTitle}
        />
        <p>{title}</p>
        <p onClick={handleClickChannel}>channel : {channelTitle}</p>
        <p>조회수 {viewCount}</p>
        <BsDot />
        <p>{publishedAt}</p>
      </div>
      <p>{duration}</p>
    </div>
  );
}
