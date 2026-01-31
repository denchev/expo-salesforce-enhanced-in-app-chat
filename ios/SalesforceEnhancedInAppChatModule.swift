import ExpoModulesCore
import SMIClientCore 
import SMIClientUI   
import Foundation

public class SalesforceEnhancedInAppChatModule: Module {
    public func definition() -> ModuleDefinition {
        Name("SalesforceEnhancedInAppChatModule")

        AsyncFunction("open") { (promise: Promise) in
            let conversationID = UUID()

            let url = Bundle.main.object(forInfoDictionaryKey: "SFInAppChatUrl") as? String ?? "DEFAULT_URL"
            
            guard let serviceAPIURL = URL(string: url) else {
                promise.reject("INVALID_URL", "Invalid URL")
                return
            }

            let organizationId = Bundle.main.object(forInfoDictionaryKey: "SFInAppChatOrganizationId") as? String ?? "DEFAULT_ORG_ID"
            let developerName = Bundle.main.object(forInfoDictionaryKey: "SFInAppChatDeveloperName") as? String ?? "DEFAULT_DEVELOPER_NAME"

            let config = UIConfiguration(serviceAPI: serviceAPIURL,
                                        organizationId: organizationId,
                                        developerName: developerName,
                                        conversationId: conversationID)

            DispatchQueue.main.async {
                let chatVC = ModalInterfaceViewController(config)
                chatVC.modalPresentationStyle = .popover
                if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                    let window = windowScene.windows.first,
                    let rootViewController = window.rootViewController {
                    rootViewController.present(chatVC, animated: true, completion: nil)
                } else {
                    NSLog("Failed to find top view controller to present SFSafariViewController")
                }
            }
        }
    }
}