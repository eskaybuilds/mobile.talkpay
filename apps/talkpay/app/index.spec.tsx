import { render, screen } from '@testing-library/react-native';

import HomeRoute from './index';

describe('HomeRoute', () => {
  it('shows the test-mode banner as a header', async () => {
    await render(<HomeRoute />);
    expect(screen.getByRole('header', { name: 'TEST MODE ONLY' })).toBeTruthy();
  });
});
