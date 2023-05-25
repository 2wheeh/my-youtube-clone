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

  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;
  const { viewCount } = video.statistics;

  const handleClick = () => {
    if (!isClampRequired) return;

    const isClamped = descRef.current.classList.contains('line-clamp-3');

    if (isClamped) {
      moreRef.current.innerText = '간략히';
      descRef.current.classList.remove('line-clamp-3');
    } else {
      moreRef.current.innerText = '더보기';
      descRef.current.classList.add('line-clamp-3');
    }
  };

  const [isClampRequired, setIsClampedRequired] = useState(false);

  useEffect(() => {
    setIsClampedRequired(
      descRef.current.scrollHeight > descRef.current.clientHeight
    );
  }, []);

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6 ">
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
        <div className="p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelCard id={channelId} title={channelTitle} />
          <div
            className="rounded-xl text-sm bg-ytgray p-3 mt-3 cursor-pointer"
            onClick={handleClick}
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
              <p className="pl-1" ref={moreRef}>
                더보기
              </p>
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
