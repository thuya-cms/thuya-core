import { ContentDefinition, ContentProvider, contentManager } from "@thuya/framework";
import userContentDefinition from "./user-content-definition";
import authRestrictionContentDefinition from "./auth-restriction-content-definition";
import roleContentDefinition from "./role-content-definition";
import AuthRestriction from "./auth-restriction";

class AuthContentProvider extends ContentProvider {
    override getContentDefinitions(): ContentDefinition<any>[] {
        return [userContentDefinition, authRestrictionContentDefinition, roleContentDefinition];
    }

    override createContent(): void {
        let authRestriction: AuthRestriction = {
            contentDefinitionName: roleContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    }
}

export default new AuthContentProvider();