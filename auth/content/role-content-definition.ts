import { ArrayContentFieldDefinition, ContentDefinition, TextContentFieldDefinition } from "@thuya/framework";
import Role from "./role";
import emailFieldDefinition from "./email-field-definition";

class RoleContentDefinition extends ContentDefinition<Role> {
    constructor() {
        super("", "role");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true });

        let roleContentField = new TextContentFieldDefinition("", "role");
        this.addContentField("roles", new ArrayContentFieldDefinition("", "roles", roleContentField), { isRequired: true });
    }
}

export default new RoleContentDefinition();