import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { routeConfig, getRoutes } from 'Routes/config';

import logo from 'assets/images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ pathname }) => {
  const currentPage = pathname.split('/')[1];

  const sidebarRoutes = getRoutes({ sidebar: true });

  return (
    <>
      <div className="brand">
        <Link to={routeConfig.dashboard.path}>
          <img src={logo} style={{ width: '100%', height: 'auto' }} />
        </Link>
      </div>
      <hr />
      <Menu theme="light" mode="inline" selectedKeys={['Customer']}>
        {Object.values(sidebarRoutes).map((value) =>
          value.sidebar.child && value.sidebar.child.length ? (
            <Menu.SubMenu
              key={value.sidebar.title}
              title={
                <>
                  <span
                    className="icon"
                    style={{
                      background:
                        currentPage === value.path.split('/')[1]
                          ? '#1890ff'
                          : '',
                    }}
                  >
                    <FontAwesomeIcon icon={value.sidebar.icon} />
                  </span>
                  <span className="label">{value.sidebar.title}</span>
                </>
              }
            >
              {value.sidebar.child.map((c) => (
                <Menu.Item key={c.title}>
                  <NavLink to={c.path}>
                    <span className="label">{c.title}</span>
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={value.sidebar.title}>
              <NavLink to={value.path}>
                <span
                  className="icon"
                  style={{
                    background:
                      currentPage === value.path.split('/')[1]
                        ? '#00BDF2'
                        : '',
                  }}
                >
                  <FontAwesomeIcon icon={value.sidebar.icon} />
                </span>
                <span className="label">{value.sidebar.title}</span>
              </NavLink>
            </Menu.Item>
          ),
        )}
      </Menu>
    </>
  );
};
