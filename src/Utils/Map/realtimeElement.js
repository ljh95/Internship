import loadingImage from '../../images/loadinglocation.png';
import unLoadingImage from '../../images/unloadingloaction.png';
// import unLoadingImage from '../../images/unloadinglocation.png';

export default function realtimeElement({ name, is_loading }) {
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

  const imgElement = document.createElement('img');
  if (is_loading) {
    imgElement.setAttribute('src', loadingImage);
  } else {
    imgElement.setAttribute('src', unLoadingImage);
  }
  const imgElementStyleObject = {
    position: 'relative',
    width: '100px',
    height: '100px',
    'text-align': 'center',
    'z-index': '1',
  };
  setStyle(imgElement, imgElementStyleObject);

  el_body.appendChild(imgElement);

  const el_p = document.createElement('p');
  const el_pStyleObject = {
    display: 'none',
    position: 'absolute',
    left: '79px',
    top: '28px',
    'min-width': '80px',
    'min-height': '25px',
    padding: '10px',
    color: '#326cf9',
    'background-color': 'white',
    border: '1px solid rgb(219, 219, 219, 0.7)',
    'border-radius': '5px',
    'text-align': 'center',
    'z-index': 2,
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
