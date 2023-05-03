import { ContentDefinition } from "@thuya/framework";
import Role from "./role";
import emailFieldDefinition from "./email-field-definition";
import rolesContentFieldDefinition from "./roles-content-field-definition";

class RoleContentDefinition extends ContentDefinition<Role> {
    constructor() {
        super("", "role");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true });

        this.addContentField("roles", rolesContentFieldDefinition, { isRequired: true });
    }
}

export default new RoleContentDefinition();