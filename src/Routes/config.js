import {
  faClipboard,
  faHome,
  faUser,
  faUserCheck,
  faUsers,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';

import { getValueOf, STORAGE_KEYS } from 'services/storage';

import Register from 'pages/Auth/Register';
import Login from 'pages/Auth/Login';
import AdminLogin from 'pages/Auth/AdminLogin';
import Logout from 'pages/Auth/Logout';
import Dashboard from 'pages/Dashboard';
import EmployeeList from 'pages/Employee/List';
import EmployeeCreate from 'pages/Employee/Create';
import EmployeeUpdate from 'pages/Employee/Update';
import CustomerList from 'pages/Customer/List';
import CustomerCreate from 'pages/Customer/Create';
import CustomerUpdate from 'pages/Customer/Update';
import ServiceList from 'pages/Service/List';
import ServiceCreate from 'pages/Service/Create';
import ServiceUpdate from 'pages/Service/Update';
import BookingList from 'pages/Booking/List';
import BookingCreate from 'pages/Booking/Create';
import BookingUpdate from 'pages/Booking/Update';
import InventoryList from 'pages/Inventory/List';
import InventoryCreate from 'pages/Inventory/Create';
import InventoryUpdate from 'pages/Inventory/Update';
import CustomerBookingList from 'pages/CustomerBooking/List';
import CustomerBookingCreate from 'pages/CustomerBooking/Create';
import EmployeeRosterList from 'pages/EmployeeRoster/List';
import RosterList from 'pages/Roster/List';
import EmployeeInfo from 'pages/Employee/Info';
import InventoryStockList from 'pages/InventoryStock/List';

export const routeConfig = {
  dashboard: {
    type: 'private',
    path: '/dashboard',
    component: Dashboard,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Dashboard',
      icon: faHome,
    },
  },
  employee: {
    type: 'private',
    path: '/employee',
    component: EmployeeList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Employee',
      icon: faUser,
    },
  },
  employeeCreate: {
    type: 'private',
    path: '/employee/create',
    roles: ['SUPERADMIN', 'ADMIN'],
    component: EmployeeCreate,
  },
  employeeUpdate: {
    type: 'private',
    path: '/employee/:id/update',
    roles: ['SUPERADMIN', 'ADMIN'],
    component: EmployeeUpdate,
  },
  employeeDetail: {
    type: 'private',
    path: '/employee/:id/detail',
    roles: ['SUPERADMIN', 'ADMIN'],
    component: EmployeeInfo,
  },
  customer: {
    type: 'private',
    path: '/customer',
    component: CustomerList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Customer',
      icon: faUsers,
    },
  },
  customerCreate: {
    type: 'private',
    path: '/customer/create',
    component: CustomerCreate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  customerUpdate: {
    type: 'private',
    path: '/customer/:id/update',
    component: CustomerUpdate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  service: {
    type: 'private',
    path: '/service',
    component: ServiceList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Service',
      icon: faUserCheck,
    },
  },
  serviceCreate: {
    type: 'private',
    path: '/service/create',
    component: ServiceCreate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  serviceUpdate: {
    type: 'private',
    path: '/service/:id/update',
    component: ServiceUpdate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  booking: {
    type: 'private',
    path: '/booking',
    component: BookingList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Booking',
      icon: faClipboard,
    },
  },
  bookingCreate: {
    type: 'private',
    path: '/booking/create',
    component: BookingCreate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  bookingUpdate: {
    type: 'private',
    path: '/booking/:id/update',
    component: BookingUpdate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  roster: {
    type: 'private',
    path: '/roster',
    component: RosterList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Roster',
      icon: faUserCheck,
    },
  },
  inventory: {
    type: 'private',
    path: '/inventory',
    component: InventoryList,
    roles: ['SUPERADMIN', 'ADMIN'],
    sidebar: {
      title: 'Inventory',
      icon: faWarehouse,
      child: [
        {
          title: 'List',
          path: '/inventory',
        },
        {
          title: 'Stock',
          path: '/inventory-stock',
        },
      ],
    },
  },
  inventoryCreate: {
    type: 'private',
    path: '/inventory/create',
    component: InventoryCreate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  inventoryUpdate: {
    type: 'private',
    path: '/inventory/:id/update',
    component: InventoryUpdate,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  inventoryStock: {
    type: 'private',
    path: '/inventory-stock',
    component: InventoryStockList,
    roles: ['SUPERADMIN', 'ADMIN'],
  },
  //customer routes
  customerBooking: {
    type: 'private',
    path: '/my-booking',
    component: CustomerBookingList,
    roles: ['CUSTOMER'],
    sidebar: {
      title: 'My Booking',
      icon: faUserCheck,
    },
  },
  customerBookingCreate: {
    type: 'private',
    path: '/my-booking/create',
    component: CustomerBookingCreate,
    roles: ['CUSTOMER'],
  },
  //employee routes
  employeeRosters: {
    type: 'private',
    path: '/my-roster',
    component: EmployeeRosterList,
    roles: ['EMPLOYEE'],
    sidebar: {
      title: 'My Roster',
      icon: faClipboard,
    },
  },
  //auth routes
  adminLogin: {
    type: 'auth',
    path: '/admin-login',
    component: AdminLogin,
    roles: ['ALL'],
  },
  register: {
    type: 'default',
    path: '/register',
    component: Register,
    roles: ['ALL'],
  },
  login: {
    type: 'default',
    path: '/login',
    component: Login,
    roles: ['ALL'],
  },
  logout: {
    type: 'default',
    path: '/logout',
    component: Logout,
    roles: ['ALL'],
  },
};

export const getRoutes = ({ sidebar }) => {
  let role = 'CUSTOMER';
  //get logged in user role
  const userDetail = getValueOf(STORAGE_KEYS.USER_DETAIL);
  if (userDetail && userDetail.role) {
    role = userDetail.role;
  }

  let routeKeys = Object.keys(routeConfig);
  if (sidebar) {
    routeKeys = Object.keys(routeConfig).filter(
      (rcf) => routeConfig[rcf]['sidebar'],
    );
  }

  const routes = routeKeys.reduce((r, rk) => {
    const routeObject = routeConfig[rk];
    const routeRoles = routeObject['roles'] || null;

    if (
      routeRoles &&
      (routeRoles.includes(role) || routeRoles.includes('ALL'))
    ) {
      r[rk] = routeObject;
    }

    return r;
  }, {});

  return routes;
};

export const getInitialRoute = () => {
  const routes = getRoutes({ sidebar: true });

  const initialRoute = Object.values(routes)[0]['path'];

  return initialRoute;
};
