const sizeArr = ['25px', '35px', '55px', '65px', '75px'];
const colorArr = [
  'rgba(244, 67, 54, 0.7)',
  'rgba(241, 107, 111, 0.7)',
  'rgba(253, 216, 53, 0.7)',
  'rgba(255, 241, 118, 0.7)',
  'rgba(67, 160, 71, 0.7)',
];

export default function dashboardElement({ site_id, name, weight, percent }) {
  const setStyle = (dom, styleObject) => {
    for (const key in styleObject) {
      dom.style[key] = styleObject[key];
    }
  };

  const el_body = document.createElement('div');
  const el_bodyStyleObject = {
    display: 'flex',
    'align-items': 'center',
    'flex-wrap': 'nowrap',
    position: 'absolute',
    'font-size': '12px',
    cursor: 'pointer',
  };
  setStyle(el_body, el_bodyStyleObject);

  const el_h1 = document.createElement('h5');
  const el_h1StyleObject = {
    position: 'relative',
    width: sizeArr[weight - 1],
    height: sizeArr[weight - 1],
    padding: '0 8px',
    color: 'white',
    'background-color': colorArr[percent - 1],
    border: '#1px solid #326cf9',
    'border-radius': '50%',
    'text-align': 'center',
    'line-height': sizeArr[weight - 1],
    'font-weight': 'blod',
    'z-index': '1',
  };
  setStyle(el_h1, el_h1StyleObject);

  el_body.appendChild(el_h1);

  const el_p = document.createElement('p');
  const el_pStyleObject = {
    display: 'none',
    position: 'absolute',
    left: sizeArr[weight - 1],
    top: '2px',
    'min-width': '70px',
    padding: '10px',
    color: '#326cf9',
    'background-color': 'white',
    border: '1px solid rgb(219, 219, 219, 0.7)',
    'border-radius': '5px',
    'text-align': 'center',
  };
  setStyle(el_p, el_pStyleObject);
  el_p.innerHTML = `${name}`;

  el_body.appendChild(el_p);
  el_body.addEventListener('click', function () {
    if (el_p.style.display === 'none') {
      el_p.style.display = 'inline';
    } else {
      el_p.style.display = 'none';
    }
  });

  return el_body;
}
