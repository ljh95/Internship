import { useState, useEffect } from 'react';
import { API } from '../Utils/config';
import isEmptyToken from '../Utils/isEmptyToken';
import getCenterAndZoom from '../Utils/Map/getCenterAndZoom';

// 첫 화면 로딩 시 TableList
// 노선 확인 버튼 클릭 시 데이터 가져옴

export default function useDriver(
  setLastPage,
  setIsMapOpened,
  setDrivesId,
  // setIsPathMapOpened,
  // isPathMapOpened,
  workSiteSelectedOption,
  currentPage,
  pageLimit,
  setPathParameter,
  setIsModalOpen,
  setModalType
  // setPathData,
  // setPathCenter,
  // setPathZoom
) {
  const [driver, setDriver] = useState({});

  // ----------------------carPathData------------------------------
  const openCarPath = e => {
    e.preventDefault();

    setDrivesId(e.target.dataset.drivesid);
    fetchPathData(e.target.dataset.drivesid);

    // if (isPathMapOpened) setIsPathMapOpened(false);
    // setIsPathMapOpened(true);
  };

  const fetchPathData = drive_record_id => {
    fetch(`${API}/records/${drive_record_id}/routes`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        let latList = [];
        let lngList = [];
        data.drive_route.forEach(el => {
          latList.push(el.latitude);
          lngList.push(el.longitude);
        });
        latList.push(data.loading_location.latitude);
        lngList.push(data.loading_location.longitude);
        latList.push(data.unloading_location.latitude);
        lngList.push(data.unloading_location.longitude);

        let [center, zoom] = getCenterAndZoom(latList, lngList);
        setPathParameter({
          center,
          zoom,
          data,
        });
        setModalType('carPath');
        setIsModalOpen(true);
        // setPathCenter(center);
        // setPathZoom(zoom);
        // setPathData(data);
      });
  };

  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    fetchDriver(`${API}/records`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmptyToken() || !workSiteSelectedOption) {
      return;
    }
    fetchDriver(
      `${API}/records?site=${workSiteSelectedOption.value}&page=${currentPage}&limit=${pageLimit}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSiteSelectedOption, currentPage, pageLimit]);

  useEffect(() => {
    if (isEmptyToken() || workSiteSelectedOption) {
      return;
    }
    fetchDriver(`${API}/records?page=${currentPage}&limit=${pageLimit}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageLimit]);

  const fetchDriver = async URL => {
    const response = await fetch(URL, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    if (response.ok) {
      setLastPage(data.last_page);
      setDriver({
        header: [
          '송장번호',
          '작업차량',
          '작업자',
          '상차지명',
          '상차시간',
          '하차지명',
          '하차시간',
          '총거리',
          '상태',
          '자원',
          '자원 총량',
          '노선확인',
          '노선추가',
        ],
        body: data.result.map(item => {
          return {
            id: item.drive_record_id,
            number: item.car,
            driver_name: item.driver,
            loading_location: item.loading_location,
            loading_time: item.loading_time,
            unloading_location: item.unloading_location,
            unloading_time: item.unloading_time,
            total_distance:
              item.total_distance === '0.0000km' ? '0km' : item.total_distance,
            status: item.status,
            resource: item.resource,
            transport_weight: item.transport_weight,
            check_path: (
              <a
                href="/"
                data-drivesid={item.drive_record_id}
                onClick={openCarPath}
              >
                노선확인
              </a>
            ),
            add_path_to_click: (
              <a
                href="/"
                data-drivesid={item.drive_record_id}
                onClick={openAddClickPath}
              >
                노선추가
              </a>
            ),
          };
        }),
      });
    } else {
      alert(Object.values(data));
    }
  };

  const openAddClickPath = e => {
    e.preventDefault();
    setDrivesId(e.target.dataset.drivesid);
    setIsMapOpened(true);
  };

  const changeSearchBarHandler = inputValue => {
    fetchDriver(`/search?input=${inputValue}`);
  };

  return [driver, changeSearchBarHandler];
}
