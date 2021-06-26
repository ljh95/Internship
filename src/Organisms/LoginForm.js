import React from 'react';
import InputWithLabel from '../Molecules/InputWithLabel';

export default function Login({ loginForm, setLoginForm }) {
  return (
    <>
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'inputId'}
        name={'inputId'}
        label={'아이디'}
        type={'id'}
        isChangable={false}
        inputType="text"
        onChangeHandler={e =>
          setLoginForm({ ...loginForm, inputId: e.target.value })
        }
        form={loginForm}
        setForm={setLoginForm}
        formType="create"
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'inputPassword'}
        name={'inputPassword'}
        label={'비밀번호'}
        type={'password'}
        onChangeHandler={e =>
          setLoginForm({ ...loginForm, inputPassword: e.target.value })
        }
        isChangable={false}
        inputType="text"
        form={loginForm}
        setForm={setLoginForm}
        formType="create"
      />
    </>
  );
}
