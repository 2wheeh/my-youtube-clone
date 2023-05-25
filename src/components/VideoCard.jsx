import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import {
  formatDate,
  parseTimeExpression,
  formatView,
  formatPlayedTime,
} from '../util/format';
import ReactPlayer from 'react-player';
import LoadingCard from './LoadingCard';

export default function VideoCard({ video }) {
  const { id: videoId } = video;
  const { publishedAt, title, channelId, channelTitle } = video.snippet;
  const { duration } = video.contentDetails;
  const { viewCount } = video.statistics;
  const { url: thumbnailURL } = video.snippet.thumbnails.medium;

  const [isHover, setIsHover] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [playedTime, setPlayedTime] = useState('00:00');
  const [timeStamp, setTimeStamp] = useState(0);

  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/watch/${videoId}`, {
      state: {
        video,
        start: timeStamp,
      },
    });
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

  const startPlayingThumbnail = () => setIsHover(true);

  const stopPlayingThumbnail = () => {
    setIsHover(false);
    setIsReady(false);
    setPlayedTime('00:00');
    setTimeStamp(0);
  };

  const handleProgress = progress => {
    const ps = Math.floor(progress.playedSeconds);

    setTimeStamp(ps);
    setPlayedTime(formatPlayedTime(ps, parsedDuration));
  };

  const handleOnReady = () => setIsReady(true);

  if (isLoading || error) return <LoadingCard />;

  return (
    <li className="p-2">
      {!isReady && (
        <div
          className="w-full relative mb-4 aspect-video rounded-xl bg-ytgray cursor-pointer"
          onMouseEnter={startPlayingThumbnail}
          onMouseLeave={stopPlayingThumbnail}
        >
          <img
            className="rounded-xl w-full  aspect-video"
            onClick={handleClick}
            src={thumbnailURL}
            alt={title}
          />
          <p className="absolute bottom-1 right-2.5 text-xs font-semibold px-1 py-0.5 bg-black rounded-md">
            {parsedDuration}
          </p>
        </div>
      )}
      {isHover && (
        <div
          className={
            isReady ? 'w-full relative mb-4 aspect-video' : 'invisible w-0 h-0'
          }
        >
          <ReactPlayer
            className="w-full"
            onReady={handleOnReady}
            onProgress={handleProgress}
            onMouseLeave={stopPlayingThumbnail}
            url={`https://www.youtube.com/watch?v=${videoId}`}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1, // 자동재생
                  controls: 0, // 컨트롤 바 없앰
                  disablekb: 1, // 썸네일 재생 시 키보드 제어 비활성화
                  enablejsapi: 1,
                  // showinfo : deprecated since 2018
                },
              },
            }}
            onEnded={stopPlayingThumbnail}
            onError={stopPlayingThumbnail}
            onPause={handleClick}
            muted={true}
            light={false}
            width="100%"
            height="100%"
          />
          <p className="absolute bottom-1 left-1.5 text-xs font-semibold">
            {playedTime} / {parsedDuration}
          </p>
        </div>
      )}

      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
        <img
          className="w-10 h-10 rounded-full "
          onClick={handleClickChannel}
          src={channel.snippet.thumbnails.default.url}
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
