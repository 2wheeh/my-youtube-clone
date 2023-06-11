import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelatedVideoCard({thumbnailURL}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  };

  return(
    <img
    className="rounded-xl w-full  aspect-video"
    src={thumbnailURL}
    onClick={handleClick}
    alt={"clickedVideo"}
  />
  )
}
