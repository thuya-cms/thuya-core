import { ArrayContentFieldDefinition, ContentDefinition, TextContentFieldDefinition } from "@thuya/framework";
import AuthRestriction from "./auth-restriction";

class AuthRestrictionContentDefinition extends ContentDefinition<AuthRestriction> {
    constructor() {
        super("", "auth-restriction");

        this.addContentField(
            "content-definition-name", 
            new TextContentFieldDefinition("", "content-definition-name"),
            { isRequired: true });

        let operationContentField = new TextContentFieldDefinition("", "operation");
        this.addContentField(
            "operations", 
            new ArrayContentFieldDefinition("", "operations", operationContentField),
            { isRequired: true });

        let roleContentField = new TextContentFieldDefinition("", "role");
        this.addContentField("roles", new ArrayContentFieldDefinition("", "roles", roleContentField));
    }
}

export default new AuthRestrictionContentDefinition();