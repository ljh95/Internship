import React from 'react';
import Button from '../Atomics/Button';
import './ButtonBundle.css';

export default function ButtonBundle({
  contentPair,
  cnPair,
  clickHandlerPair,
}) {
  return (
    <span className="button-bundle-mr-15">
      <Button
        content={contentPair[0]}
        cn={cnPair[0]}
        clickHandler={clickHandlerPair[0]}
      />
      <Button
        content={contentPair[1]}
        cn={cnPair[1]}
        clickHandler={clickHandlerPair[1]}
      />
    </span>
  );
}
