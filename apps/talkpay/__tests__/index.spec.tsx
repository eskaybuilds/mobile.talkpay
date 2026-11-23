import { render, screen } from '@testing-library/react-native';

import HomeRoute from '../app/index';

describe('HomeRoute', () => {
  it('shows the test-mode badge and the sandbox notice', async () => {
    await render(<HomeRoute />);
    expect(screen.getByLabelText('Test mode. No real money.')).toBeTruthy();
    expect(screen.getByRole('header', { name: 'TalkPay' })).toBeTruthy();
  });
});
