package expo.modules.salesforceenhancedinappchat

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import kotlinx.coroutines.launch

import com.salesforce.android.smi.core.* // For the core classes
import com.salesforce.android.smi.ui.*   // For the UI-related classes

import java.util.UUID

class SalesforceEnhancedInAppChatModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("SalesforceEnhancedInAppChatModule")

        Function("open") {
            // Generate a random conversation ID
            // (But be sure to use the SAME conversation ID if you want
            // to continue this conversation across app restarts or
            // across devices!)
            val conversationID = UUID.randomUUID()

            val context = appContext.reactContext ?: return@Function null // Early return if context is null
            val res = context.resources
            val pkgName = context.packageName

            // Fetch the values written by the Config Plugin
            val organizationId = res.getString(res.getIdentifier("expo_salesforceenhancedinappchat_organization_id", "string", pkgName))
            val apiUrl = res.getString(res.getIdentifier("expo_salesforceenhancedinappchat_url", "string", pkgName))
            val developerName = res.getString(res.getIdentifier("expo_salesforceenhancedinappchat_developer_name", "string", pkgName))

            val coreConfiguration = CoreConfiguration(
                    apiUrl,
                    organizationId,
                    developerName,
                    false)

            val config = UIConfiguration(coreConfiguration, conversationID)

            val uiClient = UIClient.Factory.create(config)

            // Obtain an Android Context from the Expo `appContext`.
            // We prioritize the current Activity to ensure the UI launches correctly.
            val myContext = appContext.currentActivity ?: appContext.reactContext

            if (myContext != null) {
                uiClient.openConversationActivity(myContext)
            } else {
                // Handle the case where context is null (rare, but good for stability)
            }

            null
        }
    }
}
