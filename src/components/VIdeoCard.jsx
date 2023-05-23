import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { formatDate, parseTimeExpression, formatView } from '../util/format';

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

  const parsedDuration = parseTimeExpression(duration);

  if (isLoading || error)
    return (
      <li className="p-2">
        <div className="relative">
          <img
            className="w-full rounded-xl mb-4"
            src="/img/loading-thumbnail.png"
            alt=""
          />
        </div>
        <div className="flex flex-row">
          <img
            className="w-10 h-10 rounded-full "
            src="/img/loading-thumbnail.png"
            alt=""
          />
          <div className="ml-2 w-full">
            <img
              className="mb-2 w-11/12 h-5 rounded-md"
              src="/img/loading-thumbnail.png"
              alt=""
            />
            <img
              className="mb-2 w-9/12 h-5 rounded-md"
              src="/img/loading-thumbnail.png"
              alt=""
            />
          </div>
        </div>
      </li>
    );

  return (
    <li className="p-2">
      <div className="relative cursor-pointer">
        <img
          className="w-full rounded-xl mb-4 "
          onClick={handleClick}
          src={thumbnailURL}
          alt={title}
        />
        <p className="absolute bottom-1 right-1.5 text-xs font-semibold px-1 py-0.5 bg-black rounded-md">
          {parsedDuration}
        </p>
      </div>
      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
        <img
          className="w-10 h-10 rounded-full "
          onClick={handleClickChannel}
          src={channel[0].snippet.thumbnails.default.url}
          alt={channelTitle}
        />
        <div className="ml-2">
          <p className="font-semibold mb-2 line-clamp-2">{title}</p>
          <p className="text-sm opacity-80" onClick={handleClickChannel}>
            {channelTitle}
          </p>
          <div className="flex flex-row">
            <p className="whitespace-nowrap text-sm opacity-80">
              조회수 {formatView(viewCount)}회
            </p>
            <BsDot />
            <p className="text-sm opacity-80">
              {formatDate(publishedAt, 'ko_KR')}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
