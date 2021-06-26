import React from 'react';

export default function Input({
  name,
  type,
  onChangeHandler,
  cn,
  isReadOnly,
  defaultValue,
  data,
  placeholder,
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      data-data={data}
      onChange={onChangeHandler}
      className={cn}
      readOnly={isReadOnly}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
