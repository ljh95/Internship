import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';
import SearchBar from '../../Molecules/SearchBar';
import MapRealTime from '../../Organisms/MapRealTime';
import SelectWorksite from '../../Molecules/SelectWorksite';
import Pagination from '../../Molecules/Pagination';
import SelectPageSize from '../../Molecules/SelectPageSize';
import Table from '../../Molecules/Table';
import isEmptyToken from '../../Utils/isEmptyToken';
import MapLineMaker from '../../Organisms/MapLineMaker';
// import MapCarPath from '../../Organisms/MapCarPath';
import useDriver from '../../Hooks/useDriver';
import useProjectWorksiteOption from '../../Hooks/useProjectWorksiteOption';
import { API } from '../../Utils/config';
import './RealTime.css';
import getCenterAndZoom from '../../Utils/Map/getCenterAndZoom';

// 처음 화면 로딩 시 맵 데이터
// 현장 선택 시 맵 데이터
// 맵 클릭커 선택 시 맵 데이터 추가

export default function RealTime({
  setIsModalOpen,
  setModalType,
  setPathParameter,
}) {
  // Select Project
  const [
    projectOptions,
    visibleWorkSiteOptions,
    projectSelectedOption,
    workSiteSelectedOption,
    setProjectSelectedOption,
    setWorkSiteSelectedOption,
  ] = useProjectWorksiteOption();

  // 초기 맵 데이터 가져옴
  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    const fetchMapDataUrl = `${API}/records/all/routes`;
    fetchData(fetchMapDataUrl);
  }, []);

  // FetchMapData
  const fetchData = async fetchMapDataUrl => {
    const response = await fetch(fetchMapDataUrl, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const mapData = await response.json();
    if (response.ok) {
      let latList = [];
      let lngList = [];
      mapData.forEach(el => {
        latList.push(el.loading_location.latitude);
        lngList.push(el.loading_location.longitude);
      });

      let [center, zoom] = getCenterAndZoom(latList, lngList);
      setRealtimeCenter(center);
      setRealtimeZoom(zoom);

      setRealtimeMapData(mapData);
    } else {
      alert(Object.values(mapData));
    }
  };

  // Map Data, 한 현장이 선택되어졌을 때
  useEffect(() => {
    if (isEmptyToken() || !workSiteSelectedOption) {
      return;
    }

    // fetch Map Data
    const site_id = workSiteSelectedOption.value;
    const fetchMapDataUrl = `${API}/records/all/routes?site_id=${site_id}`;

    fetchData(fetchMapDataUrl);
  }, [workSiteSelectedOption]);

  // MapDataList
  const [realtimeMapData, setRealtimeMapData] = useState([]);
  const [realtimeCenter, setRealtimeCenter] = useState();
  const [realtimeZoom, setRealtimeZoom] = useState();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [lastPage, setLastPage] = useState(0);

  // Click Map
  const [isClickMapOpened, setIsClickMapOpened] = useState(false);

  // Path Map
  // const [isPathMapOpened, setIsPathMapOpened] = useState(false);
  // const [pathData, setPathData] = useState([]);
  // const [pathCenter, setPathCenter] = useState();
  // const [pathZoom, setPathZoom] = useState();

  // current_drives_id
  const [drivesId, setDrivesId] = useState();

  // Driver
  const [driver, changeSearchBarHandler] = useDriver(
    setLastPage,
    setIsClickMapOpened,
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
  );

  // Map Click Event
  const addDataForTest = async coord => {
    const response = await fetch(`${API}/records/${drivesId}/routes`, {
      method: 'post',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: coord._lat,
        longitude: coord._lng,
      }),
    });

    const data = await response.json();
    if (response.ok) {
    } else {
      alert(Object.values(data));
    }
  };

  return (
    <div className="realtime-container">
      <h1 className="realtime-title">실시간 운행 현황</h1>

      <div className="realtime-filter">
        <SelectWorksite
          projectOptions={projectOptions}
          workSiteOptions={visibleWorkSiteOptions}
          projectSelectedOption={projectSelectedOption}
          workSiteSelectedOption={workSiteSelectedOption}
          setProjectSelectedOption={setProjectSelectedOption}
          setWorkSiteSelectedOption={setWorkSiteSelectedOption}
        />
      </div>

      <div className="realtime-map">
        <p>실시간 운행 내역(지도)</p>
        <MapRealTime
          zoom={realtimeZoom ? realtimeZoom : 12}
          center={
            realtimeCenter
              ? realtimeCenter
              : { lat: 37.5506849, lng: 126.9609849 }
          }
          mapData={realtimeMapData}
          elementType={'realtime'}
        />
      </div>

      <div className="realtime-manage-container">
        <div className="d-flex justify-content-between">
          <span className="h3">금일 운행 내역</span>
        </div>
        <div className="d-flex justify-content-between mb-5">
          <SelectPageSize setPageLimit={setPageLimit} />
          <SearchBar onChangeHandler={changeSearchBarHandler} />
        </div>

        {isClickMapOpened && (
          <NewWindow
            title="title"
            onUnload={() => setIsClickMapOpened(false)}
            features={{ left: 0, top: 0, width: 1000, height: 1000 }}
            copyStyles={false}
          >
            <MapLineMaker
              zoom={13}
              center={{ lat: 37.4721467, lng: 126.8091449 }}
              addDataForTest={addDataForTest}
            />
          </NewWindow>
        )}
        {/* {isPathMapOpened && (
          <MapCarPath
            zoom={pathZoom ? pathZoom : 17}
            center={
              pathCenter ? pathCenter : { lat: 37.473399, lng: 126.973618 }
            }
            loadingLocation={pathData.loading_location}
            unloadingLocation={pathData.unloading_location}
            carPathList={pathData.drive_route}
          />
        )} */}
        {Object.values(driver).length && <Table tableList={driver} />}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      </div>
    </div>
  );
}
