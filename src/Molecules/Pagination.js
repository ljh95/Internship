import React from 'react';
import PageItem from '../Atomics/PageItem';
import './Pagination.css';

export default function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const getPageBtn = () => {
    let startPage = 1;
    const cp = Number(currentPage);
    const lp = Number(lastPage);
    if (cp - 4 > 1 && cp + 5 <= lp) {
      startPage = cp - 4;
    } else if (cp + 5 > lp) {
      startPage = lp - 9;
    }

    const pageArr = [];
    for (let i = 0; i < 10; i++) {
      if (startPage + i <= 0) continue;
      if (startPage + i > lp) break;
      pageArr.push(startPage + i);
    }
    return pageArr;
  };

  const pageBtnClick = e => {
    if (e.target.localName === 'span') {
      setCurrentPage(e.target.dataset.value);
    }
  };

  return (
    <>
      {!!lastPage && (
        <ul
          className="pagination justify-content-end _pg-margin"
          onClick={pageBtnClick}
        >
          <PageItem name="First" value={1} />
          {getPageBtn().map(el => {
            return (
              <PageItem
                key={el}
                name={el}
                value={el}
                isActive={Number(currentPage) === el ? true : false}
              />
            );
          })}
          <PageItem name="Last" value={lastPage} />
        </ul>
      )}
    </>
  );
}
