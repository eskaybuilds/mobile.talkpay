import { ApiError } from '@talkpay/shared/data-access/api-client';
import { fireEvent, render, screen } from '@testing-library/react-native';

import HomeRoute from '../app/index';

const mockUseHealth = jest.fn();

// The real client reads appEnv at import time; the screen only needs the hook's states and ApiError.
jest.mock('@talkpay/shared/data-access/api-client', () => ({
  ApiError: class ApiError extends Error {
    status: number;
    constructor(status: number) {
      super(`API request failed with ${status}`);
      this.status = status;
    }
  },
  useHealthControllerCheck: () => mockUseHealth(),
}));

const query = (overrides: object) => ({
  data: undefined,
  error: null,
  isPending: false,
  isError: false,
  isRefetching: false,
  refetch: jest.fn(),
  ...overrides,
});

describe('HomeRoute health check', () => {
  it('says it is checking while the request is in flight', async () => {
    mockUseHealth.mockReturnValue(query({ isPending: true }));
    await render(<HomeRoute />);
    expect(screen.getByLabelText('Test mode. No real money.')).toBeTruthy();
    expect(screen.getByText('Checking the API…')).toBeTruthy();
  });

  it('shows the API and database status from /health', async () => {
    mockUseHealth.mockReturnValue(query({ data: { status: 'ok', info: { database: { status: 'up' } } } }));
    await render(<HomeRoute />);
    expect(screen.getByText('API: ok')).toBeTruthy();
    expect(screen.getByText('Database: up')).toBeTruthy();
  });

  it('shows the generic error with the status and retries on Try again', async () => {
    const refetch = jest.fn();
    mockUseHealth.mockReturnValue(query({ isError: true, error: new ApiError(503, undefined), refetch }));
    await render(<HomeRoute />);
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('HTTP 503')).toBeTruthy();
    fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('says the API did not answer when the request never got a response', async () => {
    mockUseHealth.mockReturnValue(query({ isError: true, error: new TypeError('Network request failed') }));
    await render(<HomeRoute />);
    expect(screen.getByText('No response from the API')).toBeTruthy();
  });
});
