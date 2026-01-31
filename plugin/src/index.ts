import {
  createRunOncePlugin,
} from 'expo/config-plugins';
import { withAndroidConfiguration } from './withAndroid';
const pkg = require('../../package.json');

const withSalesforceEnhancedInAppChat = (config: any, props: {
    OrganizationId: string;
    Url: string;
    DeveloperName: string;
}) => {
  config = withAndroidConfiguration(config, props);
  return config;
};

export default createRunOncePlugin(withSalesforceEnhancedInAppChat, pkg.name, pkg.version);