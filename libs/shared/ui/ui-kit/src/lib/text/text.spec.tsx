import { lightTheme } from '@talkpay/shared/ui/styles';
import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { Text } from './text';

describe('Text', () => {
  it('applies the type token and colour token', async () => {
    await render(
      <Text variant='title1' color='textSecondary'>
        Hello
      </Text>,
    );
    expect(StyleSheet.flatten(screen.getByText('Hello').props.style)).toMatchObject({
      ...lightTheme.type.title1,
      color: lightTheme.colors.textSecondary,
    });
  });

  it('defaults to body in textPrimary', async () => {
    await render(<Text>Hello</Text>);
    expect(StyleSheet.flatten(screen.getByText('Hello').props.style)).toMatchObject({
      fontFamily: lightTheme.type.body.fontFamily,
      color: lightTheme.colors.textPrimary,
    });
  });
});
