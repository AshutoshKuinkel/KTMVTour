// const { withSettingsGradle, withAppBuildGradle } = require('@expo/config-plugins');

// const withUnity = (config) => {
//   // Add Unity to settings.gradle
//   config = withSettingsGradle(config, (config) => {
//     const unityInclude = `
// include ':unityLibrary'
// project(':unityLibrary').projectDir = new File(rootProject.projectDir, '../unity/builds/android/unityLibrary')

// include ':xrmanifest.androidlib'
// project(':xrmanifest.androidlib').projectDir = new File(rootProject.projectDir, '../unity/builds/android/unityLibrary/xrmanifest.androidlib')
// `;
    
//     if (!config.modResults.contents.includes(':unityLibrary')) {
//       config.modResults.contents += unityInclude;
//     }
    
//     return config;
//   });

//   // Add Unity dependency to app/build.gradle
//   config = withAppBuildGradle(config, (config) => {
//     if (!config.modResults.contents.includes("implementation project(':unityLibrary')")) {
//       config.modResults.contents = config.modResults.contents.replace(
//         /dependencies\s*{/,
//         `dependencies {
//     implementation project(':unityLibrary')`
//       );
//     }
    
//     return config;
//   });

//   return config;
// };

// module.exports = withUnity;