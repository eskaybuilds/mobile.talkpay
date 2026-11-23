import { render, screen } from '@testing-library/react-native';
import { TestModeBadge } from './test-mode-badge';

describe('TestModeBadge', () => {
  it('reads as one element saying no real money moves', async () => {
    await render(<TestModeBadge />);
    expect(screen.getByLabelText('Test mode. No real money.')).toBeTruthy();
  });
});
