import { type ConfigPlugin } from 'expo/config-plugins';

export const withIosConfiguration: ConfigPlugin<{}> = (config, props) => {
  return config;
};