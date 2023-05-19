import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

export default function Channel() {
  const { channelId } = useParams();

  return (
    <>
      <div>channel banner</div>
      <p>channel : {channelId}</p>
      <nav>
        <Link to={`/channel/${channelId}`}>홈</Link>
        <Link to={`/channel/${channelId}/videos`}>비디오</Link>
        <Link to={`/channel/${channelId}/info`}>정보</Link>
      </nav>
      <Outlet />
    </>
  );
}
