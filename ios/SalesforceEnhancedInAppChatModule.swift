import ExpoModulesCore
import SMIClientCore 
import SMIClientUI   
import Foundation

public class SalesforceEnhancedInAppChatModule: Module {
    public func definition() -> ModuleDefinition {
        Name("SalesforceEnhancedInAppChatModule")

        AsyncFunction("open") { (promise: Promise) in
            let conversationID = UUID()
            
            guard let serviceAPIURL = URL(string: "URL_TO_MY_SERVICE_API") else {
                promise.reject("INVALID_URL", "Invalid URL")
                return
            }

            let config = UIConfiguration(serviceAPI: serviceAPIURL,
                                        organizationId: "ORG_ID",
                                        developerName: "API_NAME_OF_DEPLOYMENT",
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