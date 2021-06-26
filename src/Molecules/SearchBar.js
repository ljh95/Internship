import React from 'react';
import Input from '../Atomics/Input';
import './SearchBar.css';

export default function SearchBar({ onChangeHandler }) {
  return (
    <div className="d-flex justify-content-end mb-3">
      <div className="search">
        <i className="fas fa-search"></i>
        <Input
          type="text"
          cn="form-control"
          placeholder="검색"
          onChangeHandler={e => onChangeHandler(e.target.value)}
        />
      </div>
    </div>
  );
}
