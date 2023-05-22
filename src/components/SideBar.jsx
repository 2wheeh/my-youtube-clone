import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdSubscriptions } from 'react-icons/md';

export default function SideBar() {
  return (
    <aside className="flex flex-col w-0 invisible sm:w-36 sm:visible sm:mx-4">
      <Link className="my-3" to="/">
        <AiFillHome className="text-2xl w-12" />
        <p className="ml-4">홈</p>
      </Link>
      <Link className="my-3" to="/feed/subscriptions">
        <MdSubscriptions className="text-2xl w-12" />
        <p className="ml-3">구독</p>
      </Link>
    </aside>
  );
}
