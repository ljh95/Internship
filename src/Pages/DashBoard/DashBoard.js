import React, { useLayoutEffect, useState } from 'react';
import Map from '../../Organisms/Map';
import CustomChart from '../../Organisms/CustomChart';
import DashBoardOptionSection from '../../Organisms/DashBoardOptionSection';
import useProjectWorksiteOption from '../../Hooks/useProjectWorksiteOption';
import isEmptyToken from '../../Utils/isEmptyToken';
import getCenterAndZoom from '../../Utils/Map/getCenterAndZoom';
import { API } from '../../Utils/config';
import './DashBoard.css';

export default function DashBoard() {
  const [mapData, setMapData] = useState([]);
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState();

  useLayoutEffect(() => {
    if (isEmptyToken()) {
      return;
    }

    fetchWorkSitePostionData();
  }, []);

  const fetchWorkSitePostionData = async () => {
    // const response = await fetch(`${API}/projects/progress`, {
    //   headers: {
    //     Authorization: localStorage.getItem('token'),
    //   },
    // });

    const response = await fetch(`/data/progress.json`);

    const mapData = await response.json();

    if (response.ok) {
      let latList = [];
      let lngList = [];
      mapData.forEach(el => {
        latList.push(el.site_coordinate.latitude);
        lngList.push(el.site_coordinate.longitude);
      });

      let [center, zoom] = getCenterAndZoom(latList, lngList);
      setCenter(center);
      setZoom(zoom);

      setMapData(mapData);
    } else {
      if (Object.values(mapData)[0] === 'INVALID_TOKEN') {
        return;
      }
      alert(Object.values(mapData));
    }
  };

  const [
    projectOptions,
    visibleWorkSiteOptions,
    projectSelectedOption,
    workSiteSelectedOption,
    setProjectSelectedOption,
    setWorkSiteSelectedOption,
  ] = useProjectWorksiteOption();

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <Map
          zoom={zoom ? zoom : 11} //11
          center={center ? center : { lat: 37.4726272, lng: 126.840439 }} //{ lat: 37.4726272, lng: 126.840439 }
          mapData={mapData}
          elementType={'dashboard'}
        />
      </div>
      <div className="dashboard-right">
        <DashBoardOptionSection
          projectOptions={projectOptions}
          visibleWorkSiteOptions={visibleWorkSiteOptions}
          projectSelectedOption={projectSelectedOption}
          workSiteSelectedOption={workSiteSelectedOption}
          setProjectSelectedOption={setProjectSelectedOption}
          setWorkSiteSelectedOption={setWorkSiteSelectedOption}
        />
        <CustomChart workSiteSelectedOption={workSiteSelectedOption} />
      </div>
    </div>
  );
}
