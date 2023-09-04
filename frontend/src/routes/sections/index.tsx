import { Navigate, useRoutes } from 'react-router-dom';
// config
import {  PATH_HOME } from 'src/config-global';
//
import { mainRoutes } from './main';

import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_HOME} replace />,
    },

    ...dashboardRoutes,

    ...mainRoutes,

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
