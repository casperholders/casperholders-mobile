// This file' name starts with a 0 to ensure it is always first even when
// reordering imports in App.js.

import 'node-libs-react-native/globals';
import { LogBox } from 'react-native';

global.Buffer = require('buffer').Buffer;

LogBox.ignoreLogs([
  'The provided value \'moz-chunked-arraybuffer\'',
  'The provided value \'ms-stream\'',
]);
