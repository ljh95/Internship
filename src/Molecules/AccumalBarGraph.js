import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const backgroundColorList = [
  '#caf270',
  '#45c490',
  '#008d93',
  '#2e5468',
  '#98ddca',
  '#e1f1dd',
  '#9fd8df',
];

const labels = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export default function AccumalBarGraph({ chartData }) {
  const canvasDom = useRef(null);

  useEffect(() => {
    const ctx = canvasDom.current.getContext('2d');
    Chart.register(...registerables);

    if (!Object.keys(chartData).length) return;

    let datasets = Object.keys(chartData[0]).map((key, i) => {
      return {
        label: key,
        backgroundColor: backgroundColorList[i],
        data: chartData.map(resource => resource[key]),
      };
    });

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        legend: { position: 'bottom' },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return <canvas className="chart" ref={canvasDom}></canvas>;
}
