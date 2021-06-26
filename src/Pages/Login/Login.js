import React, { useState } from 'react';
import ButtonBundle from '../../Molecules/ButtonBundle';
import LoginForm from '../../Organisms/LoginForm';
import { useHistory } from 'react-router-dom';
import { API } from '../../Utils/config';
import './Login.css';
import FormHeader from '../../Molecules/FormHeader';

export default function Login({ setModalOpen, setCurrentNav }) {
  const [loginForm, setLoginForm] = useState({});
  const history = useHistory();

  const closeModalHandler = e => {
    e.preventDefault();
    setModalOpen(false);
  };

  const login = async e => {
    e.preventDefault();

    const response = await fetch(`${API}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_name: loginForm.inputId,
        password: loginForm.inputPassword,
      }),
    });

    for (let [key, value] of response.headers) {
      if (key === 'token') {
        localStorage.setItem('token', value.replaceAll('"', ''));
      }
    }
    const data = response.json();
    if (response.ok) {
      setCurrentNav(0);
      closeModalHandler(e);
      history.push(`/`);
    } else {
      alert(Object.values(data));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="createForm">
        <FormHeader header={'로그인'} closeModalHandler={closeModalHandler} />
        <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} />

        <div className="d-flex justify-content-end _login-btn">
          <ButtonBundle
            contentPair={['로그인', '취소']}
            cnPair={['btn btn-primary', 'btn btn-danger']}
            clickHandlerPair={[login, closeModalHandler]}
          />
        </div>
      </div>
    </div>
  );
}
