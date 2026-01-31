# Salesforce Enhanced In App Chat for Expo

This module creates a drop-in solution for integration of Salesforce Enhanced In App Chat. Install it via npm, update plugins configuration and then trigger then chat from within the React parts of your Expo app.

Configuration (in `app.json`, `app.plugin.js` or similar):

```json
"plugins": [
  [
    "expo-salesforce-enhanced-in-app-chat",
    {
      "OrganizationId": "",
      "DeveloperName": "",
      "Url": ""
    }
  ]
]
```

Usage from JavaScript / TypeScript (Expo):

```js
import { requireNativeModule } from 'expo-modules-core';

const NativeModule = requireNativeModule('SalesforceEnhancedInAppChatModule');

// call the native `open` method - perhaps from Pressable
NativeModule.open();
```

Notes:
The following repos have been used for inspiration
- https://github.com/JorFlux/react-native-salesforce-messaging-nitro
- https://github.com/allboatsrise/expo-marketingcloudsdk
- https://github.com/Salesforce-Async-Messaging
- https://github.com/expo/expo/tree/main/packages/expo-splash-screen

The documentation for Salesforce Enhanced In-App Chat
- https://developer.salesforce.com/docs/service/messaging-in-app/overview

Useful Expo documentation
- https://docs.expo.dev/config-plugins/development-for-libraries/
- https://docs.expo.dev/modules/overview/

I used multiple AI tools to help me with Kotlin and Swift. I must single out Gemini. It was helpless with Swift module but overall helped a lot!