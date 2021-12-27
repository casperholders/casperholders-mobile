import { DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Text>Open up App.js to start working on your app!</Text>
    </PaperProvider>
  );
}
