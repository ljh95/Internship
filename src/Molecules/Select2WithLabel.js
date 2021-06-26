import React from 'react';
import Label from '../Atomics/Label';
import Select2 from '../Atomics/Select2';

export default function Select2WithLabel({
  hf,
  labelCn,
  label,
  name,
  options,
  onChangeHandler,
  select2Cn,
  defaultValue,
  isSearchable,
  isDisabled,
}) {
  return (
    <div>
      <Label cn={labelCn} hf={hf} label={label} />
      <Select2
        onChangeHandler={onChangeHandler}
        options={options}
        cn={select2Cn}
        name={name}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
      />
    </div>
  );
}
