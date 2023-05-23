import React from 'react';

export default function LoadingCard() {
  return (
    <li className="p-2">
      <div className="relative">
        <img
          className="w-full rounded-xl mb-4"
          src="/img/loading-thumbnail.png"
          alt=""
        />
      </div>
      <div className="flex flex-row">
        <img
          className="w-10 h-10 rounded-full "
          src="/img/loading-thumbnail.png"
          alt=""
        />
        <div className="ml-2 w-full">
          <img
            className="mb-2 w-11/12 h-5 rounded-md"
            src="/img/loading-thumbnail.png"
            alt=""
          />
          <img
            className="mb-2 w-9/12 h-5 rounded-md"
            src="/img/loading-thumbnail.png"
            alt=""
          />
        </div>
      </div>
    </li>
  );
}
