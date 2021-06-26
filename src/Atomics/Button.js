import React from 'react';

export default function Button({ content, cn, clickHandler }) {
  return (
    <button type="button" className={cn} onClick={clickHandler}>
      {content}
    </button>
  );
}
