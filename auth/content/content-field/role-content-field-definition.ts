import { TextContentFieldDefinition } from "@thuya/framework";

/**
 * Content field definition for roles.
 */
class RoleContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "role");
    }
}

export default new RoleContentFieldDefinition();