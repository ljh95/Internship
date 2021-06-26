import React from 'react';

export default function Select({
  cn,
  onChangeHandler,
  values,
  defaultValueIndex,
}) {
  return (
    <select className={cn} onChange={onChangeHandler}>
      {values.map((value, i) => {
        if (i === defaultValueIndex)
          return (
            <option key={i} value={value} defaultValue>
              {value}
            </option>
          );
        return (
          <option key={i} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
