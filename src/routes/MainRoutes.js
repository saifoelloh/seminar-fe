import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Seminar = Loadable(lazy(() => import('views/dashboard/seminar')));
const SeminarCreate = Loadable(lazy(() => import('views/dashboard/seminar/CreateSeminar')));
const SeminarUpdate = Loadable(lazy(() => import('views/dashboard/seminar/UpdateSeminar')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/seminar',
      element: <Seminar />
    },
    {
      path: '/seminar/create',
      element: <SeminarCreate />
    },
    {
      path: '/seminar/update/:seminarId',
      element: <SeminarUpdate />
    }
  ]
};

export default MainRoutes;
