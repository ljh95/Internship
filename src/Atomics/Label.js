import React from 'react';

export default function Label({ hf, label, cn }) {
  return (
    <label className={cn} htmlFor={hf}>
      {label}
    </label>
  );
}
