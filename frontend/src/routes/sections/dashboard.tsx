import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { PetsProvider } from 'src/context/pets/context';
import { BreedProvider } from 'src/context/breeds/context';

const PetsListPage = lazy(() => import('src/pages/dashboard/pets/petsList'));

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <BreedProvider>
        <PetsProvider>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PetsProvider>
      </BreedProvider>
    ),
    children: [
      {
        path: 'pets',
        element: <PetsListPage />,
        index: true,
      },
    ],
  },
];
