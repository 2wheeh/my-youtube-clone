import React from 'react';
import VIdeoCard from '../components/VIdeoCard';
import { useParams } from 'react-router-dom';

export default function Videos() {
  const { videoCategoryId, channelId } = useParams();

  return (
    <>
      <p>videoCategoryId : {videoCategoryId}</p>
      <p>channelId : {channelId}</p>
      <p>list of videoCards</p>
      <VIdeoCard />
    </>
  );
}
