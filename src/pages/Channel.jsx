import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

export default function Channel() {
  const { channelId } = useParams();

  return (
    <>
      <div>channel banner</div>
      <p>channel : {channelId}</p>
      <navigator>
        <Link to={`/channel/${channelId}`}>홈</Link>
        <Link>비디오</Link>
        <Link>정보</Link>
      </navigator>
      <Outlet />
    </>
  );
}
