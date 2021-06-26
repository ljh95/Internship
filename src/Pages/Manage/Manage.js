import React, { useState, useEffect } from 'react';
import Button from '../../Atomics/Button';
import ButtonBundle from '../../Molecules/ButtonBundle';
import SelectPageSize from '../../Molecules/SelectPageSize';
import SearchBar from '../../Molecules/SearchBar';
import Table from '../../Molecules/Table';
import Pagination from '../../Molecules/Pagination';
import downloadExcel from '../../Utils/downloadExcel';
import { API } from '../../Utils/config';
import Modal from '../Modal/Modal';
import './Manage.css';

function Manage({ manageType, setCurrentNav }) {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('car');

  const [isUpdate, setIsUpdate] = useState(true);
  const [formData, setFormData] = useState({});

  window.onkeydown = function (e) {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  // Modal End
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [location, setLocation] = useState({});
  const [resource, setResource] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [lastPage, setLastPage] = useState(0);

  // only for render
  const [forRender, setForRender] = useState(0);

  useEffect(() => {
    fetchManageData(typeTable[manageType].url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manageType, pageLimit, currentPage, isModalOpen, forRender]);

  const fetchManageData = async URL => {
    const response = await fetch(URL, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    if (response.ok) {
      setLastPage(data.last_page);
      setData(data.result);
    } else {
      if (Object.values(data)[0] === 'INVALID_TOKEN') {
        return;
      }
      alert(Object.values(data));
    }
  };

  const typeTable = {
    car: {
      title: '차량 리스트',
      tableHeader: ['ID', '타입', '차량 번호', '소속 현장', '수정'],
      tableList: car,
      url: `${API}/projects/cars?page=${currentPage}&limit=${pageLimit}`,
      fetchExcelUrl: `/projects/cars/export`,
    },
    user: {
      title: '단말기 내역',
      tableHeader: ['ID', '이름', '번호', '소속현장', '수정'],
      tableList: user,
      url: `${API}/users/drivers?page=${currentPage}&limit=${pageLimit}`,
      fetchExcelUrl: `/projects/cars/export`,
    },
    location: {
      title: '상/하차지 내역',
      tableHeader: [
        'ID',
        '현장명',
        '타입',
        '명칭',
        '주소',
        '위도',
        '경도',
        '영역',
        '상태',
        '현장 승인',
        '수정',
      ],
      tableList: location,
      url: `${API}/projects/locations?page=${currentPage}&limit=${pageLimit}`,
      fetchExcelUrl: `/projects/locations/export`,
    },
    resource: {
      title: '현장별 화물 내역',
      tableHeader: ['ID', '현장명', '화물명', '화물타입', '화물단위', '수정'],
      tableList: resource,
      url: `${API}/projects/resources?page=${currentPage}&limit=${pageLimit}`,
      fetchExcelUrl: `/projects/resources/export`,
    },
  };

  const setData = data => {
    if (!data) return;
    if (manageType === 'car') {
      setCar({
        header: typeTable[manageType].tableHeader,
        body: data.map(el => {
          if (el.type === 'DumpTruck') el.typeName = '덤프트럭';
          else if (el.type === 'Tank') el.typeName = '탱크';
          else if (el.type === 'WasteTruck') el.typeName = '폐기물 차량';
          else if (el.type === 'RecyclingTruck') el.typeName = '재활용 차량';
          return {
            id: el.car_id,
            type: el.typeName,
            number: el.number,
            site: el.site.name,
            update: updateButton(manageType, el),
          };
        }),
      });
    } else if (manageType === 'user') {
      setUser({
        header: typeTable[manageType].tableHeader,
        body: data.map(el => {
          return {
            id: el.driver_id,
            name: el.name,
            phone_number: [
              el.phone_number.slice(0, 3),
              el.phone_number.slice(3, 7),
              el.phone_number.slice(7, 11),
            ].join('-'),
            site: el.site.name,
            update: updateButton(manageType, el),
          };
        }),
      });
    } else if (manageType === 'location') {
      setLocation({
        header: typeTable[manageType].tableHeader,
        body: data.map(el => {
          return {
            id: el.location_id,
            site_name: el.site[0].name,
            type: el.type ? '상차지' : '하차지',
            name: el.name,
            address: el.address,
            latitude: el.latitude.slice(0, 9),
            longitude: el.longitude.slice(0, 9),
            range: el.range + 'm',
            is_allow: el.is_allow ? '승인' : '승인 대기',
            is_allow_btn: (
              <Button
                content={el.is_allow ? '승인 취소' : '승인'}
                cn="btn btn-outline-warning"
                clickHandler={() => location_is_allow(el)}
              />
            ),
            update: updateButton(manageType, el),
          };
        }),
      });
    } else if (manageType === 'resource') {
      let resourceList = [];
      data.forEach(resource => {
        resourceList.push({
          id: resource.resource_id,
          site_name: resource.site_name,
          name: resource.name,
          type: resource.type,
          block: resource.unit,
          update: updateButton(manageType, resource),
        });
      });
      setResource({
        header: typeTable[manageType].tableHeader,
        body: resourceList,
      });
    }
  };

  const location_is_allow = el => {
    fetch(`${API}/projects/locations`, {
      method: 'put',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_id: el.location_id,
        name: el.name,
        address: el.address,
        site: [el.site[0].site_id],
        longitude: el.longitude.slice(0, 12),
        latitude: el.latitude.slice(0, 12),
        type: el.type,
        resource: [el.resource[0].resource_id],
        plan: el.plan,
        range: el.range,
        is_allow: !el.is_allow,
      }),
    });
    setForRender(forRender + 1);
  };

  const updateButton = (type, el) => {
    if (type === 'location') {
      return (
        <Button
          content="수정"
          cn="btn btn-outline-secondary"
          clickHandler={e => {
            e.preventDefault();
            // setFormData(el);
            // setModalType(type);
            // setIsUpdate(true);
            // setIsModalOpen(true);
          }}
        />
      );
    }
    return (
      <Button
        content="수정"
        cn="btn btn-outline-secondary"
        clickHandler={e => {
          e.preventDefault();
          setFormData(el);
          setModalType(type);
          setIsUpdate(true);
          setIsModalOpen(true);
        }}
      />
    );
  };

  // const deleteButton = el => {
  //   return (
  //     <Button
  //       content="삭제"
  //       cn="btn btn-outline-danger"
  //       clickHandler={e => {
  //         e.preventDefault();
  //         setFormData(el);
  //         setModalType('delete');
  //         setIsModalOpen(true);
  //       }}
  //     />
  //   );
  // };

  const changeSearchBarHandler = inputValue => {
    fetchManageData(`${typeTable[manageType].url}&search=${inputValue}`);
  };

  const createFormHandler = () => {
    setIsModalOpen(true);
    setModalType(manageType);
    setIsUpdate(false);
  };

  return (
    <div className="manage-container">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          type={modalType}
          modalType={modalType}
          isUpdate={isUpdate}
          formData={formData}
          setFormData={setFormData}
          setModalOpen={setIsModalOpen}
          setCurrentNav={setCurrentNav}
        />
      )}
      <div className="d-flex justify-content-between">
        <span className="h3">{typeTable[manageType].title}</span>
        <span className="d-flex justify-content-end mb-5">
          <ButtonBundle
            contentPair={['엑셀 다운로드', '추가']}
            cnPair={['btn btn-outline-success', 'btn btn-outline-primary']}
            clickHandlerPair={[
              e =>
                downloadExcel(
                  e,
                  typeTable[manageType].fetchExcelUrl,
                  manageType
                ),
              createFormHandler,
            ]}
          />
        </span>
      </div>
      <div className="d-flex justify-content-between mb-5">
        <SelectPageSize
          lastPage={lastPage}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <SearchBar onChangeHandler={changeSearchBarHandler} />
      </div>
      {!!Object.values(typeTable[manageType].tableList).length && (
        <Table tableList={typeTable[manageType].tableList} />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
    </div>
  );
}
export default React.memo(Manage);
