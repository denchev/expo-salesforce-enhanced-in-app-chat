import { ConfigPlugin, withProjectBuildGradle, withAppBuildGradle, withStringsXml, AndroidConfig } from 'expo/config-plugins';
import { mergeContents } from '@expo/config-plugins/build/utils/generateCode';

export const withAndroidConfiguration: ConfigPlugin<{
  OrganizationId: string;
  Url: string;
  DeveloperName: string;
}> = (config, props) => {

config = withConfiguration(config, props);

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

const withConfiguration: ConfigPlugin<{
    OrganizationId: string;
    Url: string;
    DeveloperName: string;
}> = (config, props) => {
    return withStringsXml(config, config => {
      // Helper to add string.xml JSON items or overwrite existing items with the same name.
      config.modResults = AndroidConfig.Strings.setStringItem(
        [
          // XML represented as JSON
          { $: { name: 'expo_salesforceenhancedinappchat_organization_id', translatable: 'false' }, _: props.OrganizationId },
          { $: { name: 'expo_salesforceenhancedinappchat_url', translatable: 'false' }, _: props.Url },
          { $: { name: 'expo_salesforceenhancedinappchat_developer_name', translatable: 'false' }, _: props.DeveloperName },
        ],
        config.modResults
      );
    
    return config;
  });
}