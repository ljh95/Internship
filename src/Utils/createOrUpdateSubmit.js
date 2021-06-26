import { API } from './config';

export default function createOrUpdateSubmit(
  formData,
  closeModalHandler,
  isUpdate,
  type
) {
  const fetchParameterTable = () => {
    let url;
    let body;
    // eslint-disable-next-line default-case
    switch (type) {
      case 'car':
        url = `${API}/projects/cars`;
        if (!isUpdate) {
          body = {
            type: formData.type,
            number: formData.number,
            site: formData.site,
            driver: formData.driver,
          };
        } else if (isUpdate) {
          body = {
            car_id: formData.car_id,
            pk: formData.car_id,
            type: formData.type,
            number: formData.number,
            site: formData.site,
            driver: formData.driver,
          };
        }
        return {
          url,
          body,
        };
      case 'user':
        url = `${API}/users/drivers`;
        if (!isUpdate) {
          body = {
            site: formData.site.value,
            name: formData.name,
            phone_number: formData.phone_number,
          };
        } else if (isUpdate) {
          body = {
            driver_id: formData.driver_id,
            site: formData.site.site_id,
            name: formData.name,
            phone_number: formData.phone_number,
          };
        }
        return {
          url,
          body,
        };
      case 'location':
        url = `${API}/projects/locations`;
        if (!isUpdate) {
          body = {
            name: formData.name,
            address: formData.address.address + ' ' + formData.detailAddress,
            longitude: formData.address.lon.slice(0, 12),
            latitude: formData.address.lat.slice(0, 12),
            range: Number(formData.range),
            type: formData.type,
            site: formData.site_name,
            resource: [1],
            plan: formData.plan,
          };
        } else if (isUpdate) {
          body = {
            location_id: formData.location_id,
            name: formData.name,
            address: formData.address,
            site: [formData.site[0].site_id],
            longitude: formData.longitude.slice(0, 12),
            latitude: formData.latitude.slice(0, 12),
            type: formData.type,
            resource: [formData.resource[0].resource_id],
            plan: formData.plan,
            range: formData.range,
          };
        }
        return {
          url,
          body,
        };
      case 'resource':
        url = `${API}/projects/resources`;
        if (!isUpdate) {
          body = {
            site: formData.site.value, // "site": 8,
            type: formData.resource.value, //"type": "Waste",
            name: formData.name, //"산업폐기물"
            block: 'Kg', // "Kg"
          };
        } else if (isUpdate) {
          body = {
            resource_id: formData.resource_id,
            site: formData.site_id,
            type: formData.type,
            name: formData.name,
            block: formData.unit,
          };
        }
        return {
          url,
          body,
        };
    }
  };

  const submit = async e => {
    const fetchData = fetchParameterTable();
    const url = fetchData.url;
    const method = !isUpdate ? `post` : 'put';
    const requestBody = fetchData.body;

    const response = await createOrUpdateFetch(url, method, requestBody);

    const data = await response.json();
    if (response.ok) {
      closeModalHandler(e);
    } else {
      alert(Object.values(data));
    }
  };

  const createOrUpdateFetch = (URL, method, body) => {
    return fetch(URL, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    });
  };

  return submit;
}
