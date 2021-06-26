import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';

const navLinkArr = [
  {
    name: '대시 보드',
    type: 'dashboard',
  },
  {
    name: '실시간 보드',
    type: 'liveBoard',
  },
  {
    name: '차량',
    type: 'car',
  },
  {
    name: `상, 하차`,
    type: 'location',
  },
  {
    name: '단말기',
    type: 'user',
  },
  {
    name: '성상',
    type: 'resource',
  },
];

export default function Nav({ setManageType, currentNav, setCurrentNav }) {
  const history = useHistory();

  const goManagePage = (e, manageType) => {
    e.preventDefault();

    if (manageType === 'dashboard') {
      setCurrentNav(0);
      history.push('/');
      return;
    }
    if (manageType === 'liveBoard') {
      setCurrentNav(1);
      history.push('/realtime');
      return;
    }

    let navLinkIndex;
    for (let i = 0; i < navLinkArr.length; i++) {
      if (navLinkArr[i].type === manageType) {
        navLinkIndex = i;
        break;
      }
    }
    setCurrentNav(navLinkIndex);
    setManageType(manageType);
    history.push('/manage');
  };

  return (
    <aside>
      <nav>
        <ul className="nav flex-column">
          {navLinkArr.map((nav, i) => {
            return (
              <li
                className={`nav-item ${i === currentNav && 'nav-active'}`}
                key={i}
                onClick={e => goManagePage(e, nav.type)}
              >
                <a className="custom-nav-link" href="/">
                  {nav.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
