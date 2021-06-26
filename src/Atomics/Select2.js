import React from 'react';
import Select from 'react-select';

export default function Select2({
  name,
  options,
  onChangeHandler,
  cn,
  defaultValue,
  isSearchable,
  isDisabled,
}) {
  return (
    <Select
      name={name}
      options={options}
      onChange={onChangeHandler}
      className={cn}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
    />
  );
}
