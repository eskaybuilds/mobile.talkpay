import { render, screen } from '@testing-library/react-native';
import { CircleAlert } from 'lucide-react-native';
import { Button } from '../button/button';
import { StateBlock } from './state-block';

describe('StateBlock', () => {
  it('announces a danger block as an alert, with its caption and actions', async () => {
    await render(
      <StateBlock
        tone='danger'
        icon={CircleAlert}
        title='Something went wrong'
        body="We couldn't load this screen. Your money is safe and nothing has changed."
        caption='Error ref · E-7F3A'
        actions={<Button label='Try again' />}
      />,
    );
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Error ref · E-7F3A')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
  });

  it('is not an alert in a neutral tone', async () => {
    await render(<StateBlock icon={CircleAlert} title='You’re offline' body='Reconnect to send money or chat.' />);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
