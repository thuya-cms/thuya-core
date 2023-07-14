import { ContentFieldDefinition, ContentDefinition, ContentProvider, contentManager } from "@thuya/framework";
import userContentDefinition from "./content-definition/user-content-definition";
import authRestrictionContentDefinition, { ContentDefinitionContentFieldDefinition, OperationContentFieldDefinition, OperationsContentFieldDefinition } from "./content-definition/auth-restriction-content-definition";
import roleContentDefinition from "./content-definition/role-assignment-content-definition";
import AuthRestriction from "./content-definition/types/auth-restriction";
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

    override getInitialContent(): { contentDefinitionName: string, content: any }[] {
        return [{
            contentDefinitionName: authRestrictionContentDefinition.getName(),
            content: {
                contentDefinitionName: roleContentDefinition.getName(),
                operations: ["POST", "GET", "PATCH", "DELETE"],
                roles: ["admin"]
            }
        }, {
            contentDefinitionName: authRestrictionContentDefinition.getName(),
            content: {
                contentDefinitionName: userContentDefinition.getName(),
                operations: ["POST", "GET", "PATCH", "DELETE"],
                roles: ["admin"]
            }
        }, {
            contentDefinitionName: authRestrictionContentDefinition.getName(),
            content: {
                contentDefinitionName: authRestrictionContentDefinition.getName(),
                operations: ["POST", "GET", "PATCH", "DELETE"],
                roles: ["admin"]
            }
        }];
    }
}

export default new AuthContentProvider();