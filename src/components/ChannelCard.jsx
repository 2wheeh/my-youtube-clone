import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { formatView } from '../util/format';

export default function ChannelCard({ id, title }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data } = useQuery(
    ['channel', `${id}`],
    () => youtube.getChannel(id),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) return <>isLoading</>;

  return (
    <div className="flex my-4 items-center">
      <div className="w-10 h-10 rounded-full bg-ytgray">
        <img
          className="w-10 h-10 rounded-full"
          src={data.snippet.thumbnails.default.url}
          alt={title}
        />
      </div>
      <div className="flex flex-col text-lg font-medium ml-2">
        <p className="font-bold">{title}</p>
        {!data.statistics.hiddenSubscriberCount && (
          <p className="text-sm">{`구독자 ${formatView(
            data.statistics.subscriberCount
          )}명`}</p>
        )}
      </div>
    </div>
  );
}
