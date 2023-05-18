import React from 'react';
import { useParams } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

export default function Search() {
  const { keyword } = useParams();

  return (
    <>
      <p>list of resultCard keyword : {keyword}</p>
      <ResultCard />
    </>
  );
}
