import React, { useEffect, useState } from 'react';
import InputWithLabel from '../Molecules/InputWithLabel';
import Select2WithLabel from '../Molecules/Select2WithLabel';
import { API } from '../Utils/config';

export default function CreateUser({ isUpdate, formData, setFormData }) {
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    fetchLocationList();
  }, []);

  const fetchLocationList = async () => {
    const response = await fetch(`${API}/projects`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();

    if (response.ok) {
      let locationList = [];
      data.result.forEach(project => {
        project.site.forEach(site => {
          locationList.push({ label: site.name, value: site.site_id });
        });
      });
      setLocationList(locationList);
    } else {
      alert(Object.values(data));
    }
  };
  return (
    <div>
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'site'}
        name={'site'}
        label={'소속 현장'}
        options={locationList}
        onChangeHandler={selectedOption => {
          setFormData({ ...formData, site: selectedOption });
        }}
        isSearchable={true}
        isDisabled={isUpdate && true}
        defaultValue={isUpdate && { label: formData.site.name }}
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'name'}
        label={'이름'}
        name={'name'}
        type={'text'}
        onChangeHandler={e =>
          setFormData({ ...formData, name: e.target.value })
        }
        isDisabled={isUpdate && true}
        inputType={''}
        defaultValue={isUpdate ? formData.name : null}
      />

      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'phone_number'}
        label={'단말기'}
        name={'phone_number'}
        type={'number'}
        onChangeHandler={e =>
          setFormData({ ...formData, phone_number: e.target.value })
        }
        isDisabled={false}
        defaultValue={isUpdate && formData.phone_number.replaceAll('-', '')}
      />
    </div>
  );
}
