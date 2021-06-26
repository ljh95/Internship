import React, { useEffect, useState } from 'react';
import AccumalBarGraph from '../Molecules/AccumalBarGraph';
import ChartDescription from '../Molecules/ChartDescription';
import { API } from '../Utils/config';
import isEmptyToken from '../Utils/isEmptyToken';
import './CustomChart.css';

function CustomChart({ workSiteSelectedOption }) {
  const [chartData, setChartData] = useState({});
  const [workAmountList, setWorkAmountList] = useState([]);

  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    const url = `${API}/projects/workloads`;
    const options = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    fetchChartData(url, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmptyToken() || !workSiteSelectedOption) {
      return;
    }

    // const url = `${API}/projects/${workSiteSelectedOption.value}/workloads`;
    // const options = {
    //   headers: {
    //     Authorization: localStorage.getItem('token'),
    //   },
    // };
    const url = `/data/workloads.json`;
    const options = {
      // headers: {
      //   Authorization: localStorage.getItem('token'),
      // },
    };
    fetchChartData(url, options);
  }, [workSiteSelectedOption]);

  const fetchChartData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      setChartData(data.detail_workloads);
      setWorkAmountList([
        { title: '금주 작업량', value: data.this_week_workloads },
        { title: '이번달 작업량', value: data.this_month_workloads },
        { title: '올해 작업량', value: data.this_year_workloads },
      ]);
    } else {
      alert(Object.values(data));
    }
  };

  return (
    <div className="chart-wrapper">
      <h1 className="chart-title">월별 작업(누적)</h1>
      <AccumalBarGraph chartData={chartData} />
      <ChartDescription workAmountList={workAmountList} />
    </div>
  );
}

export default CustomChart;
