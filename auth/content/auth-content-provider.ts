import { ContentDefinition, ContentProvider, contentManager } from "@thuya/framework";
import userContentDefinition from "./content-definition/user-content-definition";
import authRestrictionContentDefinition, { ContentDefinitionContentFieldDefinition, OperationContentFieldDefinition, OperationsContentFieldDefinition } from "./content-definition/auth-restriction-content-definition";
import roleContentDefinition from "./content-definition/role-assignment-content-definition";
import AuthRestriction from "./content-definition/types/auth-restriction";
import { ContentFieldDefinition } from "@thuya/framework";
import emailFieldDefinition from "./content-field/email-content-field-definition";
import passwordFieldDefinition from "./content-field/password-content-field-definition";
import roleContentFieldDefinition from "./content-field/role-content-field-definition";
import rolesContentFieldDefinition from "./content-field/roles-content-field-definition";

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