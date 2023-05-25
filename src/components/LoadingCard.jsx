import React from 'react';

export default function LoadingCard() {
  return (
    <li className="p-2">
      <div className="w-full h-mid mb-4 rounded-xl bg-ytgray" />
      <div className="flex flex-row h-40">
        <div className="w-10 h-10 rounded-full bg-ytgray" />
        <div className="ml-2 w-full">
          <div className="mb-2 w-11/12 h-5 rounded-md bg-ytgray" />
          <div className="mb-2 w-9/12 h-5 rounded-md bg-ytgray" />
        </div>
      </div>
    </li>
  );
}
