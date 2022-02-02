import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { merge } from 'lodash';
import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

export default merge(NavigationDarkTheme, PaperDarkTheme, {
  dark: true,
  roundness: 8,
  colors: {
    primary: '#00126b',
    textLoader: '#0d0e35',
    background: '#00012a',
    surface: '#00012a',
    card: '#00012a',
    error: '#ff5252',
    success: '#4caf50',
    notification: '#ff473e',
  },
});
