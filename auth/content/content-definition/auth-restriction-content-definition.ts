import { ArrayContentFieldDefinition, ContentDefinition, TextContentFieldDefinition } from "@thuya/framework";
import AuthRestriction from "./types/auth-restriction";
import rolesContentFieldDefinition from "../content-field/roles-content-field-definition";

/**
 * Content field definition for content definition names.
 */
class ContentDefinitionContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "content-definition-name");
    }
}

/**
 * Content field definition for operations.
 */
class OperationContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "operation");
    }
}

/**
 * Content field definition for an array of operations.
 */
class OperationsContentFieldDefinition extends ArrayContentFieldDefinition {
    constructor() {
        super("", "operations", new OperationContentFieldDefinition());
    }
}

/**
 * Content definition for authorization restrictions.
 */
class AuthRestrictionContentDefinition extends ContentDefinition<AuthRestriction> {
    constructor() {
        super("", "auth-restriction");

        this.addContentField(
            "contentDefinitionName", 
            new ContentDefinitionContentFieldDefinition(),
            { isRequired: true, isIndexed: true });

        this.addContentField(
            "operations", 
            new OperationsContentFieldDefinition(),
            { isRequired: true });

        this.addContentField("authorizedRoles", rolesContentFieldDefinition);
    }
}

export { ContentDefinitionContentFieldDefinition, OperationContentFieldDefinition, OperationsContentFieldDefinition };
export default new AuthRestrictionContentDefinition();