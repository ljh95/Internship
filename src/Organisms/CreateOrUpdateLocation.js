import React, { useEffect, useState } from 'react';
import InputWithLabel from '../Molecules/InputWithLabel';
import Select2WithLabel from '../Molecules/Select2WithLabel';
import FormAddress from '../Molecules/FormAddress';
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
          setFormData({ ...formData, site_name: [selectedOption.value] })
        }
        isSearchable={true}
        isDisabled={isUpdate && true}
        defaultValue={isUpdate && { label: formData.site[0].name }}
      />
      <Select2WithLabel
        labelCn={'col-sm-2 col-form-label default-label'}
        select2Cn={'col-sm-8 d-inline-block'}
        hf={'type'}
        name={'type'}
        label={'타입'}
        options={[
          { label: '상차지', value: true },
          { label: '하차지', value: false },
        ]}
        onChangeHandler={selectedOption =>
          setFormData({ ...formData, type: selectedOption.value })
        }
        isSearchable={true}
        isDisabled={isUpdate && true}
        defaultValue={
          isUpdate && {
            label: formData.type ? '상차지' : '하차지',
          }
        }
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'name'}
        name={'name'}
        label={'명칭'}
        type={'text'}
        onChangeHandler={e =>
          setFormData({ ...formData, name: e.target.value })
        }
        isDisabled={isUpdate && true}
        inputType={''}
        defaultValue={isUpdate ? formData.name : null}
      />
      <FormAddress
        form={formData}
        setForm={setFormData}
        isUpdate={isUpdate}
        formData={formData}
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'range'}
        name={'range'}
        label={'영역'}
        type={'number'}
        onChangeHandler={e =>
          setFormData({ ...formData, range: Number(e.target.value) })
        }
        isDisabled={false}
        inputType={''}
        defaultValue={isUpdate ? formData.range : null}
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
        defaultValue={isUpdate && { label: formData.resource[0].name }}
      />
      <InputWithLabel
        labelCn={'col-sm-2 col-form-label'}
        inputCn={'form-control _form-input'}
        hf={'plan'}
        name={'plan'}
        label={'계획'}
        type={'number'}
        onChangeHandler={e =>
          setFormData({ ...formData, plan: Number(e.target.value) })
        }
        isDisabled={false}
        inputType={''}
        defaultValue={isUpdate ? formData.plan : null}
      />
    </div>
  );
}
