import React, { useEffect, useState } from 'react';
import InputWithLabel from '../Molecules/InputWithLabel';
import Select2WithLabel from '../Molecules/Select2WithLabel';
import { API } from '../Utils/config';

export default function CreateCar({ isUpdate, formData, setFormData }) {
  const [carTypeList, setCarTypeList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const carTypeResponse = await fetch(`${API}/projects/cars/types`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const locationResponse = await fetch(`${API}/projects`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const driverResponse = await fetch(`${API}/users/drivers`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const carTypeData = await carTypeResponse.json();
    const locationData = await locationResponse.json();
    const driverData = await driverResponse.json();

    if (carTypeResponse.ok && locationResponse.ok && driverResponse.ok) {
      let carTypeList = [];
      carTypeData.forEach(carType => {
        carTypeList.push({ label: carType[1], value: carType[0] });
      });
      setCarTypeList(carTypeList);

      let locationList = [];
      locationData.result.forEach(project => {
        project.site.forEach(site => {
          locationList.push({ label: site.name, value: site.site_id });
        });
      });
      setLocationList(locationList);

      let driverList = [];
      driverData.result.forEach(driver => {
        driverList.push({ label: driver.name, value: driver.driver_id });
      });
      setDriverList(driverList);
    } else {
      alert(
        Object.values(carTypeData),
        Object.values(locationData),
        Object.values(driverData)
      );
    }
  };
  return (
    <div>
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'type'}
        name={'type'}
        label={'차량타입'}
        options={carTypeList}
        onChangeHandler={selectedOption => {
          setFormData({ ...formData, type: selectedOption.value });
        }}
        isSearchable={false}
        isDisabled={isUpdate && true}
        defaultValue={isUpdate && { label: formData.typeName }}
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input '}
        hf={'carNumber'}
        name={'carNumber'}
        label={'차량번호'}
        type={'text'}
        onChangeHandler={e => {
          if (e.target.value === '') {
            return;
          }
          setFormData({ ...formData, number: e.target.value });
        }}
        isDisabled={isUpdate && true}
        inputType={''}
        defaultValue={isUpdate ? formData.number : null}
      />
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'site'}
        name={'site'}
        label={'소속현장'}
        options={locationList}
        onChangeHandler={selectedOption =>
          setFormData({ ...formData, site: selectedOption.value })
        }
        isSearchable={false}
        isDisabled={false}
        defaultValue={isUpdate && { label: formData.site.name }}
      />
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'driver'}
        name={'driver'}
        label={'유저(단말기)'}
        options={driverList}
        onChangeHandler={selectedOption =>
          setFormData({ ...formData, driver: [selectedOption.value] })
        }
        isSearchable={false}
        isDisabled={false}
      />
    </div>
  );
}
