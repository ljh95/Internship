import React from 'react';
import MapCarPath from '../../Organisms/MapCarPath';
import ModalConfirm from '../../Organisms/ModalConfirm';
import { API } from '../../Utils/config';
import CreateORUpdate from '../CreateOrUpdate/CreateOrUpdate';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import './Modal.css';

export default function Modal({
  isModalOpen,
  modalType,
  manageType,
  formData,
  isUpdate,
  setFormData,
  setModalOpen,
  setCurrentNav,
  pathParameter,
}) {
  // delete modal
  const deleteExecute = async e => {
    e.preventDefault();
    const response = await fetch(`${API}`, {
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert(data);
    } else {
      alert(Object.values(data));
    }
  };
  const deleteRollback = e => {
    e.preventDefault();
    setModalOpen(false);
  };
  const deleteheaderContent = '삭제하기';
  const deleteBtnContent = '삭제';
  const deleteCn = 'btn btn-danger';

  const clickXButton = () => {
    setModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div className="custom__Modal">
          <div className="xbtn" onClick={clickXButton}>
            X
          </div>
          {modalType === 'login' && (
            <Login setModalOpen={setModalOpen} setCurrentNav={setCurrentNav} />
          )}
          {modalType === 'logout' && <Logout setModalOpen={setModalOpen} />}
          {modalType === 'delete' && (
            <ModalConfirm
              execute={deleteExecute}
              rollback={deleteRollback}
              headerContent={deleteheaderContent}
              btnContent={deleteBtnContent}
              cn={deleteCn}
            />
          )}
          {(modalType === 'car' ||
            modalType === 'user' ||
            modalType === 'location' ||
            modalType === 'resource') && (
            <CreateORUpdate
              isUpdate={isUpdate}
              modalType={modalType}
              manageType={manageType}
              formData={formData}
              setFormData={setFormData}
              setModalOpen={setModalOpen}
            />
          )}
          {modalType === 'carPath' && (
            <MapCarPath
              zoom={pathParameter.zoom ? pathParameter.zoom : 17}
              center={
                pathParameter.center
                  ? pathParameter.center
                  : { lat: 37.473399, lng: 126.973618 }
              }
              loadingLocation={pathParameter.data.loading_location}
              unloadingLocation={pathParameter.data.unloading_location}
              carPathList={pathParameter.data.drive_route}
            />
          )}
        </div>
      )}
    </>
  );
}
