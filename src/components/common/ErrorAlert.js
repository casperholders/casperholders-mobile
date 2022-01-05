import { List, useTheme } from 'react-native-paper';

export default function ErrorAlert({ message }) {
  const theme = useTheme();

  return (
    <List.Item
      title={message}
      left={(props) => <List.Icon {...props} icon="alert" />}
      style={{
        backgroundColor: theme.colors.error,
        borderRadius: theme.roundness,
        marginBottom: 12,
      }}
    />
  );
}
