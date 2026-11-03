import { screen } from '@testing-library/react';
import { fetchHealth } from '../services/healthService';
import { renderRoutes } from '../test/renderWithProviders';
import { routes } from './routes';

jest.mock('../services/healthService');
const mockFetchHealth = jest.mocked(fetchHealth);

describe('app routes', () => {
  it('renders the dashboard with a healthy API status', async () => {
    mockFetchHealth.mockResolvedValue({
      status: 'ok',
      database: 'connected',
      uptimeSeconds: 10,
      timestamp: '2026-11-03T00:00:00.000Z',
    });

    renderRoutes(routes, '/');

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(await screen.findByText('API: ok')).toBeInTheDocument();
    expect(screen.getByText('Database: connected')).toBeInTheDocument();
  });

  it('shows an error state when the API is unreachable', async () => {
    mockFetchHealth.mockRejectedValue(new Error('Unable to reach the server. Check your connection.'));

    renderRoutes(routes, '/');

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to reach the server');
  });

  it('renders the not-found page for unknown paths', () => {
    mockFetchHealth.mockReturnValue(new Promise(() => {}));

    renderRoutes(routes, '/no-such-page');

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });
});
