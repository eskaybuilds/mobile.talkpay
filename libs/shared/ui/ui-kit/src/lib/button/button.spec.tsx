import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from './button';

describe('Button', () => {
  it('is a labelled button that fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label='Try again' onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ignores presses and says so when disabled', async () => {
    const onPress = jest.fn();
    await render(<Button label='Continue' disabled onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'Continue' });
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('is busy and ignores presses while loading', async () => {
    const onPress = jest.fn();
    await render(<Button label='Sending…' loading onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'Sending…' });
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
  });
});
