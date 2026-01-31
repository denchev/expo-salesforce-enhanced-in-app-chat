import {
  createRunOncePlugin,
} from 'expo/config-plugins';
import { withAndroidConfiguration } from './withAndroid';
const pkg = require('../../package.json');

const withSalesforceEnhancedInAppChat = (config: any) => {
  config = withAndroidConfiguration(config, {} as any);
  return config;
};

export default createRunOncePlugin(withSalesforceEnhancedInAppChat, pkg.name, pkg.version);