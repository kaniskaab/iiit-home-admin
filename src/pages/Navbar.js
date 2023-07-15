import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
      <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="notices">Notices</a>
        </li>
        <li>
          <a href="tenders">Tenders</a>
        </li>
        <li>
          <a href="news">News</a>
        </li>
        <li>
          <a href="placement-highlights">Placement Highlights</a>
        </li>
        <li>
          <a href="research-details">Research Details</a>
        </li>
        <li>
          <a href="stories">Stories</a>
        </li>
        <li>
          <a href="placement">Top Companies</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
