import { ContentDefinition, ContentProvider, contentManager } from "@thuya/framework";
import userContentDefinition from "./user-content-definition";
import authRestrictionContentDefinition, { ContentDefinitionContentFieldDefinition, OperationContentFieldDefinition, OperationsContentFieldDefinition } from "./auth-restriction-content-definition";
import roleContentDefinition from "./role-content-definition";
import AuthRestriction from "./auth-restriction";
import { ContentFieldDefinitionDTO } from "@thuya/framework/dist/content-management/app/dto/content-field-definition/content-field-definition";
import emailFieldDefinition from "./email-field-definition";
import passwordFieldDefinition from "./password-field-definition";
import roleContentFieldDefinition from "./role-content-field-definition";
import rolesContentFieldDefinition from "./roles-content-field-definition";

class AuthContentProvider extends ContentProvider {
    override getContentFieldDefinitions(): ContentFieldDefinitionDTO[] {
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

    override createContent(): void {
        let authRestriction: AuthRestriction = {
            contentDefinitionName: roleContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);

        authRestriction = {
            contentDefinitionName: userContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);

        authRestriction = {
            contentDefinitionName: authRestrictionContentDefinition.getName(),
            operations: ["POST", "GET", "PATCH", "DELETE"],
            roles: ["admin"]
        };
        contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    }
}

export default new AuthContentProvider();