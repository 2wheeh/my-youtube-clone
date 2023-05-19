import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';

export default function VideoCard({ video }) {
  const { id: videoId } = video;
  const { publishedAt, title, channelId } = video.snippet;
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

  return (
    <div>
      <img onClick={handleClick} src={thumbnailURL} alt={title} />
      <div onClick={handleClick}>
        {/* <img src="channel logo url" alt="channel name" /> */}
        <p>{title}</p>
        <p onClick={handleClickChannel}>channel : {channelId}</p>
        <p>조회수 {viewCount}</p>
        <BsDot />
        <p>{publishedAt}</p>
      </div>
      <p>{duration}</p>
    </div>
  );
}
