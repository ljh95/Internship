import React from 'react';

export default function PageItem({ name, value, isActive }) {
  return (
    <li className={`page-item ${isActive ? 'active' : ''}`}>
      <span
        className={`page-link user-select-none clickable`}
        data-value={value}
      >
        {name}
      </span>
    </li>
  );
}
