package expo.modules.salesforceenhancedinappchat

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import kotlinx.coroutines.launch

class SalesforceEnhancedInAppChatModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("SalesforceEnhancedInAppChatModule")

        Function("open") {
            // write something in the console for testing
            println("SalesforceEnhancedInAppChatModule: open called")
        }
    }
}
