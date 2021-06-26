import React from 'react';
import Label from '../Atomics/Label';
import Input from '../Atomics/Input';
import './InputWithLabel.css';

export default function InputWithLabel({
  labelCn,
  inputCn,
  hf,
  label,
  name,
  type,
  onChangeHandler,
  isDisabled,
  inputType,
  defaultValue,
}) {
  return (
    <div className="mb-3 row _form-div">
      <Label hf={hf} cn={labelCn} label={label} />
      <div className="col-sm-10 _form-input-div">
        <Input
          name={name}
          type={type}
          onChangeHandler={onChangeHandler}
          cn={inputCn}
          isReadOnly={isDisabled}
          data={inputType}
          defaultValue={defaultValue}
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
    </div>
  );
}
