import React, { useEffect, useState } from 'react';
import { ImYoutube } from 'react-icons/im';
import { BsList, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const { keyword } = useParams();
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const trimmed = text.trim();

    if (trimmed.length === 0) return;

    navigate(`/search/${trimmed}`);
  };

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  return (
    <header>
      <button>
        <BsList />
      </button>
      <Link to="/">
        <ImYoutube />
        <h1>my-youtube</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button>
          <BsSearch />
        </button>
      </form>
      <button>로그인</button>
    </header>
  );
}
