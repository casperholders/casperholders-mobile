const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function gradleConfig(config, prefix) {
  return withProjectBuildGradle(config, async config => {
    let buildGradle = config.modResults;
    buildGradle.contents = buildGradle.contents.replace('minSdkVersion = 21', 'minSdkVersion = 24');
    return config;
  });
};