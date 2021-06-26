import React, { useEffect, useState } from 'react';
import InputWithLabel from '../Molecules/InputWithLabel';
import Select2WithLabel from '../Molecules/Select2WithLabel';
import { API } from '../Utils/config';

export default function CreateCar({ isUpdate, formData, setFormData }) {
  const [locationList, setLocationList] = useState([]);
  const [resourceList, setResourceList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const locationResponse = await fetch(`${API}/projects`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const resourceResponse = await fetch(`${API}/projects/resources/types`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const locationData = await locationResponse.json();
    const resourceData = await resourceResponse.json();

    if (locationResponse.ok && resourceResponse.ok) {
      let locationList = [];
      locationData.result.forEach(project => {
        project.site.forEach(site => {
          locationList.push({ label: site.name, value: site.site_id });
        });
      });
      setLocationList(locationList);

      let resourceList = [];
      resourceData.forEach(resource => {
        resourceList.push({ label: resource[1], value: resource[0] });
      });
      setResourceList(resourceList);
    } else {
      alert(Object.values(locationData), Object.values(resourceData));
    }
  };
  return (
    <div>
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'site_name'}
        name={'site_name'}
        label={'현장명'}
        options={locationList}
        onChangeHandler={selectedOption =>
          setFormData({ ...formData, site: selectedOption })
        }
        isSearchable={true}
        isDisabled={isUpdate && true}
        defaultValue={isUpdate && { label: formData.site_name }}
      />
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'resource'}
        name={'resource'}
        label={'자원'}
        options={resourceList}
        onChangeHandler={selectedOption =>
          setFormData({ ...formData, resource: selectedOption })
        }
        isSearchable={true}
        isDisabled={false}
        defaultValue={isUpdate && { label: formData.type }}
      />

      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'name'}
        name={'name'}
        label={'화물이름'}
        type={'text'}
        onChangeHandler={e =>
          setFormData({ ...formData, name: e.target.value })
        }
        isDisabled={false}
        inputType={''}
        defaultValue={isUpdate ? formData.name : null}
      />
    </div>
  );
}
