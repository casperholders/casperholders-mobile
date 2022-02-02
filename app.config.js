/**
 * Expo config, override the version of the app by the version provided in the package.json file
 * @param config
 * @returns {*&{version: string}}
 */
export default ({ config }) => {
  const pjson = require('./package.json');
  return {
    'version': pjson.version,
    ...config,
  };
};
