import React from 'react';
import ButtonBundle from '../../Molecules/ButtonBundle';
import FormHeader from '../../Molecules/FormHeader';
import './Login.css';

export default function Logout({ setModalOpen }) {
  const closeModalHandler = e => {
    e.preventDefault();
    setModalOpen(false);
  };

  const logout = async e => {
    e.preventDefault();

    localStorage.setItem('token', '');
    closeModalHandler(e);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="createForm">
        <FormHeader header={'로그아웃'} closeModalHandler={closeModalHandler} />

        <div className="d-flex justify-content-end _login-btn">
          <ButtonBundle
            contentPair={['로그아웃', '취소']}
            cnPair={['btn btn-primary', 'btn btn-danger']}
            clickHandlerPair={[logout, closeModalHandler]}
          />
        </div>
      </div>
    </div>
  );
}
