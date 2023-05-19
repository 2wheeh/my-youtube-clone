import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CategoryHeader() {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery(
    ['videoCategories'],
    () => {
      return axios.get('/data/categories.json').then(res => res.data.items);
    },
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
