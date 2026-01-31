import { type ConfigPlugin, withProjectBuildGradle, withAppBuildGradle } from 'expo/config-plugins';

export const withAndroidConfiguration: ConfigPlugin<{}> = (config, props) => {
  // Add project-level maven repo to android/build.gradle
  config = withProjectBuildGradle(config, (config) => {
    const repoLine = "maven { url 'https://s3.amazonaws.com/inapp.salesforce.com/public/android' }";
    const contents = config.modResults.contents;

    if (contents.includes(repoLine)) {
      return config;
    }

    // Try to insert into an existing allprojects -> repositories block
    if (/allprojects\s*\{[\s\S]*?repositories\s*\{/.test(contents)) {
      config.modResults.contents = contents.replace(/(allprojects\s*\{[\s\S]*?repositories\s*\{)/, `$1\n        ${repoLine}`);
      return config;
    }

    // Fallback: insert into first repositories { block
    if (/repositories\s*\{/.test(contents)) {
      config.modResults.contents = contents.replace(/(repositories\s*\{)/, `$1\n        ${repoLine}`);
      return config;
    }

    // Last resort: append an allprojects block with the repo
    config.modResults.contents = `${contents}\n\nallprojects {\n    repositories {\n        ${repoLine}\n    }\n}`;
    return config;
  });

  // Add implementation dependency to app/build.gradle
  config = withAppBuildGradle(config, async (config) => {
    let { contents } = config.modResults;

    const dependency =
      "implementation 'com.salesforce.service:messaging-inapp-ui:1.10.2'";

    // Check if dependency is already added
    if (!contents.includes("com.salesforce.service:messaging-inapp-ui")) {
      // Find the dependencies { section and add implementation
      const dependenciesRegex = /(dependencies\s*\{)/;

      if (dependenciesRegex.test(contents)) {
        contents = contents.replace(dependenciesRegex, `$1\n    ${dependency}`);
      }
    }

    // Add packaging configuration to android section
    if (!contents.includes('excludes += "META-INF/versions/**"')) {
      const androidSectionRegex = /(android\s*\{[^}]*?namespace[^}]*?\n)/;

      const packagingConfig = `    packaging {
        resources {
            excludes += "META-INF/versions/**"
        }
    }
`;

      if (androidSectionRegex.test(contents)) {
        contents = contents.replace(
          androidSectionRegex,
          `$1${packagingConfig}`,
        );
      }
    }

    config.modResults.contents = contents;
    return config;
  });

  return config;
};