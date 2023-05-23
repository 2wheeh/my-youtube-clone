import React, { useEffect, useState } from 'react';
import { ImYoutube } from 'react-icons/im';
import { BsList, BsSearch } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';

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
    <header className="w-full flex p-4 ml-3 text-2xl border-b border-zinc-600 mb-4">
      <button className="pr-4">
        <BsList />
      </button>
      <Link to="/" className="flex items-center">
        <ImYoutube className="text-3xl text-brand" />
        <h1 className="font-bold ml-2 text-3xl whitespace-nowrap">
          my-youtube
        </h1>
      </Link>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          className="w-7/12 p-2 rounded-l-full outline-none bg-black text-gray-50"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <button className="bg-zinc-600 px-4 w-16 rounded-r-full ">
          <BsSearch />
        </button>
      </form>
      <button className="flex flex-row content-center whitespace-nowrap my-2 mr-4 px-2 border-white border border-solid bg-black text-blue-400 rounded-l-full rounded-r-full text-lg ">
        <RxAvatar className="text-2xl mt-1.5 mx-1" />
        <p className="text-md m-1">로그인</p>
      </button>
    </header>
  );
}
