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
    <nav className="pt-2 pb-8">
      <Link className="m-2 p-2 rounded-md bg-zinc-600 text-lg" to="/home">
        전체
      </Link>
      {categories.slice(0, 5).map(item => (
        <Link
          className="m-1 p-2 rounded-md bg-zinc-600 text-lg"
          to={`/home/${item.id}`}
          key={item.id}
        >
          {item.snippet.title}
        </Link>
      ))}
    </nav>
  );
}
