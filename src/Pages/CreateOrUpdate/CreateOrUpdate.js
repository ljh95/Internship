import React, { useState } from 'react';
import CreateOrUpdateCar from '../../Organisms/CreateOrUpdateCar';
import CreateOrUpdateUser from '../../Organisms/CreateOrUpdateUser';
import CreateOrUpdateLocation from '../../Organisms/CreateOrUpdateLocation';
import CreateOrUpdateResource from '../../Organisms/CreateOrUpdateResource';
import ButtonBundle from '../../Molecules/ButtonBundle';
import createOrUpdateSubmit from '../../Utils/createOrUpdateSubmit';
import Button from '../../Atomics/Button';
import './CreateOrUpdate.css';

export default function CreateOrUpdate({
  setModalOpen,
  modalType,
  isUpdate,
  formData,
  setFormData,
}) {
  // useReducer
  const [carForm, setCarForm] = useState({});
  const [userForm, setUserForm] = useState({});
  const [locationForm, setLocationForm] = useState({});
  const [resourceForm, setResourceForm] = useState({});

  const closeModalHandler = e => {
    e.preventDefault();
    setModalOpen(false);
  };

  const createTable = {
    car: (
      <CreateOrUpdateCar
        carForm={carForm}
        setCarForm={setCarForm}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    user: (
      <CreateOrUpdateUser
        userForm={userForm}
        setUserForm={setUserForm}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    location: (
      <CreateOrUpdateLocation
        locationForm={locationForm}
        setLocationForm={setLocationForm}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    resource: (
      <CreateOrUpdateResource
        resourceForm={resourceForm}
        setResourceForm={setResourceForm}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
      />
    ),
  };

  const formHeaderTable = {
    car: `차량 ${isUpdate ? '수정' : '생성'}`,
    location: `상 하차지 ${isUpdate ? '수정' : '생성'}`,
    user: `단말기 ${isUpdate ? '수정' : '생성'}`,
    resource: `성상 ${isUpdate ? '수정' : '생성'}`,
  };

  const submit = createOrUpdateSubmit(
    formData,
    closeModalHandler,
    isUpdate,
    modalType
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="createForm">
        <div className="formHeader">
          <h1 className="d-inline-block">{formHeaderTable[modalType]}</h1>
          <Button cn="btn-close" clickHandler={closeModalHandler} />
        </div>

        {createTable[modalType]}

        <div className="formButtons d-flex justify-content-end">
          <ButtonBundle
            contentPair={['제출', '취소']}
            cnPair={['btn btn-primary', 'btn btn-danger']}
            clickHandlerPair={[submit, closeModalHandler]}
          />
        </div>
      </div>
    </div>
  );
}
