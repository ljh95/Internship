import React from 'react';
import Button from '../../Atomics/Button';
import isEmptyToken from '../../Utils/isEmptyToken';
import './Header.css';

export default function Header({ setIsModalOpen, setModalType }) {
  const openLoginModal = e => {
    e.preventDefault();
    setModalType('login');
    setIsModalOpen(true);
  };

  const openLogoutModal = e => {
    e.preventDefault();
    setModalType('logout');
    setIsModalOpen(true);
  };

  return (
    <header className="header">
      <h1 className="header-logo">B2TECH</h1>
      <div className="header-nav">
        {isEmptyToken() ? (
          <Button
            content="로그인"
            cn="btn btn-primary"
            clickHandler={openLoginModal}
          />
        ) : (
          <Button
            content="로그아웃"
            cn="btn btn-danger"
            clickHandler={openLogoutModal}
          />
        )}
      </div>
    </header>
  );
}
