import { ContentDefinition, ContentProvider } from "@thuya/framework";
import userContentDefinition from "./user-content-definition";
import authRestrictionContentDefinition from "./auth-restriction-content-definition";

class AuthContentProvider extends ContentProvider {
    public getContentDefinitions(): ContentDefinition<any>[] {
        return [userContentDefinition, authRestrictionContentDefinition];
    }
}

export default new AuthContentProvider();