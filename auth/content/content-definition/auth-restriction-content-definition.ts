import { ArrayContentFieldDefinition, ContentDefinition, TextContentFieldDefinition } from "@thuya/framework";
import AuthRestriction from "./types/auth-restriction";
import rolesContentFieldDefinition from "../content-field/roles-content-field-definition";

class ContentDefinitionContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "content-definition-name");
    }
}

class OperationContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "operation");
    }
}

class OperationsContentFieldDefinition extends ArrayContentFieldDefinition {
    constructor() {
        super("", "operations", new OperationContentFieldDefinition());
    }
}

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