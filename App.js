import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from '@/Main';

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
      <Main />
    </PaperProvider>
  );
}
