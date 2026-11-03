import type { RouteObject } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { NotFoundPage } from '../components/NotFoundPage';
import { RouteErrorPage } from '../components/RouteErrorPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
