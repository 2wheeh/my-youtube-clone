import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import RelatedVideos from '../components/RelatedVideos';
import ChannelCard from '../components/ChannelCard';
import { formatDate, formatView } from '../util/format';

export default function Watch() {
  const { videoId } = useParams();
  const {
    state: { video, start },
  } = useLocation();

  const descRef = useRef(null);
  const moreRef = useRef(null);
  const descContainerRef = useRef(null);

  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;
  const { viewCount } = video.statistics;

  const handleClick = e => {
    e.stopPropagation();

    const isClamped = descRef.current.classList.contains('line-clamp-3');

    if (isClamped) {
      moreRef.current.innerText = '간략히';
      moreRef.current.removeEventListener('click', handleClick);
      moreRef.current.addEventListener('click', handleClick);

      descRef.current.classList.remove('line-clamp-3');
      descContainerRef.current.classList.remove('cursor-pointer');

      descContainerRef.current.removeEventListener('click', handleClick);
    } else {
      moreRef.current.innerText = '더보기';
      moreRef.current.removeEventListener('click', handleClick);

      descRef.current.classList.add('line-clamp-3');

      descContainerRef.current.classList.add('cursor-pointer');

      descContainerRef.current.removeEventListener('click', handleClick); // to avoid repeat
      descContainerRef.current.addEventListener('click', handleClick);
    }
  };

  const [isClampRequired, setIsClampedRequired] = useState(false);

  useEffect(() => {
    const flag = descRef.current.scrollHeight > descRef.current.clientHeight;
    setIsClampedRequired(flag);

    if (flag) {
      descContainerRef.current.removeEventListener('click', handleClick);
      descContainerRef.current.addEventListener('click', handleClick);

      descContainerRef.current.classList.add('cursor-pointer');
    }
  }, []);

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6 mx-3 px-4">
        <div className="aspect-video">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1, // 자동재생
                  controls: 1,
                  enablejsapi: 1,
                  start,
                },
              },
            }}
            muted={true}
            light={false}
            width="100%"
            height="100%"
          />
        </div>
        <div className="py-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelCard id={channelId} title={channelTitle} />
          <div
            className="rounded-xl text-sm bg-ytgray p-3 mt-3"
            ref={descContainerRef}
          >
            <p className="whitespace-nowrap font-bold">
              {`조회수 ${formatView(viewCount)}회 ${formatDate(
                publishedAt,
                'ko_KR'
              )}`}
            </p>
            <pre className="whitespace-pre-wrap line-clamp-3" ref={descRef}>
              {description}
            </pre>
            {isClampRequired ? (
              <span className="pl-1 cursor-pointer" ref={moreRef}>
                더보기
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </article>
      <section className="basis-2/6">
        <RelatedVideos id={videoId} />
      </section>
    </section>
  );
}
