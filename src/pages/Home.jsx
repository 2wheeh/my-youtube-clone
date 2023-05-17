import React from 'react';
import CategoryHeader from '../components/CategoryHeader';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <CategoryHeader />
      <Outlet />
    </>
  );
}
