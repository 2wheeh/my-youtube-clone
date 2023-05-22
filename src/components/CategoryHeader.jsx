import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function CategoryHeader() {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery(
    ['videoCategories'],
    () => youtube.getCategories(),
    { staleTime: 1000 * 60 * 5 } // 5 min
  );

  if (isLoading) return <p>isLoading</p>;

  if (error) return <p>error</p>;

  return (
    <nav>
      <Link to="/home">전체</Link>
      {categories.slice(0, 5).map(item => (
        <Link to={`/home/${item.id}`} key={item.id}>
          {item.snippet.title}
        </Link>
      ))}
    </nav>
  );
}
