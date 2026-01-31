# expo-salesforce-enhanced-in-app-chat

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
- The Android module currently logs to logcat when `open()` is called. Check Android Studio's Logcat to verify.