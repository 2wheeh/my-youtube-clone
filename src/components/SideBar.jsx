import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdSubscriptions } from 'react-icons/md';

export default function SideBar() {
  return (
    <aside>
      <Link to="/">
        <AiFillHome />
      </Link>
      <Link to="/feed/subscriptions">
        <MdSubscriptions />
      </Link>
    </aside>
  );
}
