import { ApiError, useHealthControllerCheck } from '@talkpay/shared/data-access/api-client';
import { Button, Screen, StateBlock, Text } from '@talkpay/shared/ui/ui-kit';
import { CircleAlert } from 'lucide-react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// Phase 0 placeholder, not a designed screen: it proves Postgres → /health → OpenAPI → Orval → TanStack Query.
export default function HomeRoute() {
  const { data, error, isPending, isError, refetch, isRefetching } = useHealthControllerCheck();

  if (isError) {
    return (
      <Screen>
        <StateBlock
          tone='danger'
          icon={CircleAlert}
          title='Something went wrong'
          body="We couldn't load this screen. Your money is safe and nothing has changed."
          caption={error instanceof ApiError ? `HTTP ${error.status}` : 'No response from the API'}
          actions={<Button label='Try again' loading={isRefetching} onPress={() => refetch()} />}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.body}>
        <Text variant='title1' accessibilityRole='header'>
          Health check
        </Text>
        {isPending ? (
          <Text color='textSecondary'>Checking the API…</Text>
        ) : (
          <>
            <Text>API: {data.status}</Text>
            <Text>Database: {data.info?.database?.status ?? 'unknown'}</Text>
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.space.space2 },
}));
