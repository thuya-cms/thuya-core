import { ContentDefinition, ContentProvider, contentManager } from "@thuya/framework";
import userContentDefinition from "./user-content-definition";
import authRestrictionContentDefinition, { ContentDefinitionContentFieldDefinition, OperationContentFieldDefinition, OperationsContentFieldDefinition } from "./auth-restriction-content-definition";
import roleContentDefinition from "./role-content-definition";
import AuthRestriction from "./auth-restriction";
import { ContentFieldDefinition } from "@thuya/framework";
import emailFieldDefinition from "./email-field-definition";
import passwordFieldDefinition from "./password-field-definition";
import roleContentFieldDefinition from "./role-content-field-definition";
import rolesContentFieldDefinition from "./roles-content-field-definition";

class AuthContentProvider extends ContentProvider {
    override getContentFieldDefinitions(): ContentFieldDefinition[] {
        return [
            emailFieldDefinition, 
            passwordFieldDefinition, 
            roleContentFieldDefinition,
            rolesContentFieldDefinition,

            new OperationContentFieldDefinition(),
            new OperationsContentFieldDefinition(), 
            new ContentDefinitionContentFieldDefinition()];
    }

    override getContentDefinitions(): ContentDefinition[] {
        return [userContentDefinition, authRestrictionContentDefinition, roleContentDefinition];
    }

    override async createContent(): Promise<void> {
        let authRestriction: AuthRestriction = {
            contentDefinitionName: roleContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);

        authRestriction = {
            contentDefinitionName: userContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);

        authRestriction = {
            contentDefinitionName: authRestrictionContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    }
}

export default new AuthContentProvider();