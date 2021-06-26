import React from 'react';

function Table({ tableList }) {
  return (
    <table className="table table-hover">
      <thead className="textalign-center fw-bold">
        <tr>
          {tableList.header.map((header, i) => (
            <th key={i} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableList.body.map((bodyObj, i) => (
          <tr key={i} className="textalign-center">
            {Object.values(bodyObj).map((bodyValue, i) => (
              <td key={i}>{bodyValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default React.memo(Table);
