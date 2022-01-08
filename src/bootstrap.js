import Big from 'big.js';
import 'node-libs-react-native/globals';
import { LogBox } from 'react-native';
import toFormat from 'toformat';

toFormat(Big);

LogBox.ignoreLogs([
  'The provided value \'moz-chunked-arraybuffer\'',
  'The provided value \'ms-stream\'',
]);
