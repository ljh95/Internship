import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Pages/Header/Header';
import Nav from './Pages/Nav/Nav';
import DashBoard from './Pages/DashBoard/DashBoard';
import Manage from './Pages/Manage/Manage';
import Modal from './Pages/Modal/Modal';
import RealTime from './Pages/RealTime/RealTime';
import isEmptyToken from './Utils/isEmptyToken';
import './Styles/common.css';

export default function Routes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('car'); // modal type [login, logout, car, user, location, resource]

  const [formData, setFormData] = useState({});

  const [manageType, setManageType] = useState('car'); // manage type [car, user, location, resource]

  const [pathParameter, setPathParameter] = useState();

  window.onkeydown = function (e) {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!localStorage.getItem('token') || isEmptyToken()) {
      setIsModalOpen(true);
      setModalType('login');
      return;
    }
  });

  // 클릭한 Nav를 저장하는 state
  const [currentNav, setCurrentNav] = useState(0);

  return (
    <Router>
      <Header setIsModalOpen={setIsModalOpen} setModalType={setModalType} />
      <div className="flex">
        <Nav
          setManageType={setManageType}
          currentNav={currentNav}
          setCurrentNav={setCurrentNav}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <DashBoard isModalOpen={isModalOpen} />}
          ></Route>
          <Route
            exact
            path="/realtime"
            component={() => (
              <RealTime
                setIsModalOpen={setIsModalOpen}
                setModalType={setModalType}
                setPathParameter={setPathParameter}
              />
            )}
          ></Route>
          <Route
            exact
            path="/manage"
            component={() => (
              <Manage manageType={manageType} setCurrentNav={setCurrentNav} />
            )}
          ></Route>
        </Switch>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        modalType={modalType}
        manageType={manageType}
        formData={formData}
        pathParameter={pathParameter}
        setFormData={setFormData}
        setModalOpen={setIsModalOpen}
        setCurrentNav={setCurrentNav}
      />
    </Router>
  );
}
