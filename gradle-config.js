const { withProjectBuildGradle } = require('@expo/config-plugins');
/**
 * Expo plugin to override the minSdkVersion for android
 * @param config
 * @param prefix
 * @returns {*}
 */
module.exports = function gradleConfig(config, prefix) {
  return withProjectBuildGradle(config, async config => {
    let buildGradle = config.modResults;
    buildGradle.contents = buildGradle.contents.replace('Integer.parseInt(findProperty(\'android.minSdkVersion\') ?: \'21\')', 'Integer.parseInt(findProperty(\'android.minSdkVersion\') ?: \'24\')');
    return config;
  });
};
