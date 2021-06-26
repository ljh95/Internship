import React from 'react';
import Select from '../Atomics/Select';

export default function SelectPageSize({
  lastPage,
  pageLimit,
  setPageLimit,
  currentPage,
  setCurrentPage,
}) {
  return (
    <span>
      <Select
        cn="form-select form-select-lg  w-60 _height-46p d-inline-block"
        onChangeHandler={e => {
          const rate = pageLimit / e.target.value;
          let cp = currentPage;
          if (lastPage === currentPage && lastPage !== 1) cp -= 1;
          let couldCurrent = Math.ceil(cp * rate);
          setCurrentPage(couldCurrent);
          // setCurrentPage(1);
          setPageLimit(e.target.value);
        }}
        values={[10, 25, 50, 100]}
        defaultValueIndex={0}
      />
      씩 보기
    </span>
  );
}
