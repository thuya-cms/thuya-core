import { ContentDefinition } from "@thuya/framework";
import Role from "./types/role";
import emailFieldDefinition from "../content-field/email-content-field-definition";
import rolesContentFieldDefinition from "../content-field/roles-content-field-definition";

class RoleContentDefinition extends ContentDefinition<Role> {
    constructor() {
        super("", "role");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true });

        this.addContentField("roles", rolesContentFieldDefinition, { isRequired: true });
    }
}

export default new RoleContentDefinition();