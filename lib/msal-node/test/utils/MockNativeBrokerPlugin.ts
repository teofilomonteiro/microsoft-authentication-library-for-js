import { AccountInfo, AuthenticationResult, INativeBrokerPlugin } from "@azure/msal-common";
import { mockAuthenticationResult } from "./TestConstants";

export class MockNativeBrokerPlugin implements INativeBrokerPlugin {
    isBrokerAvailable: boolean = true;

    setLogger(): void {
        return;
    }

    getAccountById(): Promise<AccountInfo> {
        return Promise.resolve(mockAuthenticationResult.account!);
    }

    getAllAccounts(): Promise<AccountInfo[]> {
        return Promise.resolve([mockAuthenticationResult.account!]);
    }

    acquireTokenSilent(): Promise<AuthenticationResult> {
        return Promise.resolve(mockAuthenticationResult);
    }

    acquireTokenInteractive(): Promise<AuthenticationResult> {
        return Promise.resolve(mockAuthenticationResult);
    }

    signOut(): Promise<void> {
        return Promise.resolve();
    }

}