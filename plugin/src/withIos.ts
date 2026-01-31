import { type ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

export const withIosConfiguration: ConfigPlugin<{
    OrganizationId: string;
    Url: string;
    DeveloperName: string;
}> = (config, props) => {
    const { OrganizationId, Url, DeveloperName } = props;
  return withInfoPlist(config, (cfg) => {
    const modResults = (cfg.modResults ?? {}) as any;

    // Add or preserve existing values, set defaults if missing
    modResults.NSCameraUsageDescription = modResults.NSCameraUsageDescription ?? 'Used when sending an image to a Salesforce chat agent.';
    modResults.NSPhotoLibraryUsageDescription = modResults.NSPhotoLibraryUsageDescription ?? 'Used when sending an image to a Salesforce chat agent.';
    modResults.LSSupportsOpeningDocumentsInPlace = true;
    modResults.UIFileSharingEnabled = true;

    modResults.SFInAppChatOrganizationId = OrganizationId;
    modResults.SFInAppChatUrl = Url;
    modResults.SFInAppChatDeveloperName = DeveloperName;

    cfg.modResults = modResults;
    return cfg;
  });
};