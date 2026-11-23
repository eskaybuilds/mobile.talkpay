import { render, screen } from '@testing-library/react-native';
import { Text } from '../text/text';
import { Screen } from './screen';

describe('Screen', () => {
  it('pins the test-mode badge above its content', async () => {
    await render(
      <Screen>
        <Text>Content</Text>
      </Screen>,
    );
    expect(screen.getByLabelText('Test mode. No real money.')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
