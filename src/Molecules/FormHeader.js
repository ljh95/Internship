import React from 'react';
import Button from '../Atomics/Button';
import './FormHeader.css';

export default function FormHeader({ header, closeModalHandler }) {
  return (
    <div className="formHeader">
      <h1 className="d-inline-block">{header}</h1>
      <Button cn="btn-close" clickHandler={closeModalHandler} />
    </div>
  );
}
