export default ({ config }) => {
  const pjson = require('./package.json');
  return {
    "version": pjson.version,
    ...config,
  };
};
