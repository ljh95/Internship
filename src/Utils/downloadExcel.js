import { API } from './config';

export default async function downloadExcel(e, fetchExcelUrl, manageType) {
  e.preventDefault();

  const requestOptions = {
    method: 'get',
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: localStorage.getItem('token'),
    },
  };
  const response = await fetch(`${API}${fetchExcelUrl}`, requestOptions);

  response.blob().then(blob => download(blob, `${manageType}.xlsx`));
}

function download(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  // the filename you want
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
