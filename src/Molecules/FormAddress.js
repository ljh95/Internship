import React from 'react';
import Button from '../Atomics/Button';
import Input from '../Atomics/Input';
import Label from '../Atomics/Label';

export default function FormAddress({ form, setForm, isUpdate, formData }) {
  const { daum } = window;
  const daumPostcode = () => {
    new daum.Postcode({
      oncomplete: data => {
        Promise.resolve(data)
          .then(() => {
            const { address } = data;

            return new Promise((resolve, reject) => {
              const geocoder = new daum.maps.services.Geocoder();

              geocoder.addressSearch(address, (result, status) => {
                if (status === daum.maps.services.Status.OK) {
                  const { x, y } = result[0];

                  resolve({ lat: y, lon: x, address });
                } else {
                  reject();
                }
              });
            });
          })
          .then(result => {
            setForm({ ...form, address: result });
          });
        document.getElementById('jibunAddress').value = data.jibunAddress;
      },
    }).open();
  };

  const getDefaultAddress = () => {
    return isUpdate
      ? formData.address
          .split(' ')
          .filter((_, i) => i !== formData.address.split(' ').length - 1)
          .join(' ')
      : '';
  };

  const getDefaultDetailAddress = () => {
    return isUpdate
      ? formData.address.split(' ')[formData.address.split(' ').length - 1]
      : '';
    // return '';
  };

  return (
    <div className="d-flex justify-content-start">
      <Label
        hf="detailAddress"
        label="주소"
        cn="col-sm-2 col-form-label default-label"
      />
      <span>
        <Button
          content="우편번호 찾기"
          clickHandler={daumPostcode}
          cn="btn btn-outline-secondary"
        />
        <Input
          cn="form-control _form-input"
          type="text"
          name="jibunAddress"
          placeholder="지번주소"
          defaultValue={getDefaultAddress()}
          isReadOnly={true}
        />
        <Input
          cn="form-control _form-input"
          type="text"
          name="detailAddress"
          placeholder="상세주소"
          onChangeHandler={e =>
            setForm({ ...form, detailAddress: e.target.value })
          }
          defaultValue={getDefaultDetailAddress()}
        />
      </span>
    </div>
  );
}
