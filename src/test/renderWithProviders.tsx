import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router';
import { theme } from '../app/theme';

function createTestQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

/** Renders a route tree at the given URL with the same providers as the app (fresh query cache, no retries). */
export function renderRoutes(routes: RouteObject[], initialPath = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

export function renderWithProviders(ui: ReactElement) {
  return renderRoutes([{ path: '*', element: ui }]);
}
