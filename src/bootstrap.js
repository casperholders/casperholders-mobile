import 'node-libs-react-native/globals';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'The provided value \'moz-chunked-arraybuffer\'',
  'The provided value \'ms-stream\'',
]);
