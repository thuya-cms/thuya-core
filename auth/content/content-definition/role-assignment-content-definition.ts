import { ContentDefinition } from "@thuya/framework";
import Role from "./types/role";
import emailFieldDefinition from "../content-field/email-content-field-definition";
import rolesContentFieldDefinition from "../content-field/roles-content-field-definition";

class RoleAssignmentContentDefinition extends ContentDefinition<Role> {
    constructor() {
        super("", "role-assignment");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true, isIndexed: true });

        this.addContentField("roles", rolesContentFieldDefinition, { isRequired: true });
    }
}

export default new RoleAssignmentContentDefinition();