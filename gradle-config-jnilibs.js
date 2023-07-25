const { createRunOncePlugin, withAppBuildGradle } = require('@expo/config-plugins');

const withAppBuildGradleModified = config => {
  return withAppBuildGradle(config, async file => {
    const modResults = file.modResults;
    if (!modResults.contents.includes('android.packagingOptions.jniLibs.useLegacyPackaging = true')) {
      modResults.contents = modResults.contents + '\nandroid.packagingOptions.jniLibs.useLegacyPackaging = true\n';
    }
    return file;
  });
};


module.exports = createRunOncePlugin(
  withAppBuildGradleModified,
  'withAppBuildGradleModified',
  '1.0.0',
);
