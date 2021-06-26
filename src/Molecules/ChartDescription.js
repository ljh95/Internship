import React from 'react';

export default function ChartDescription({ workAmountList }) {
  return (
    <div className="d-flex justify-content-between chart-작업량">
      {workAmountList.map(({ title, value }, i) => (
        <div key={i} className="textalign-center">
          <p>{title}</p>
          <p>
            <strong>{value}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}
