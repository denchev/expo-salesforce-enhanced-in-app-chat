import { type ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

export const withIosConfiguration: ConfigPlugin<{}> = (config, props) => {
  return withInfoPlist(config, (cfg) => {
    const modResults = (cfg.modResults ?? {}) as any;

    // Add or preserve existing values, set defaults if missing
    modResults.NSCameraUsageDescription = modResults.NSCameraUsageDescription ?? 'Used when sending an image to a Salesforce chat agent.';
    modResults.NSPhotoLibraryUsageDescription = modResults.NSPhotoLibraryUsageDescription ?? 'Used when sending an image to a Salesforce chat agent.';
    modResults.LSSupportsOpeningDocumentsInPlace = true;
    modResults.UIFileSharingEnabled = true;

    cfg.modResults = modResults;
    return cfg;
  });
};