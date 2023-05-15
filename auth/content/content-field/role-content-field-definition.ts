import { TextContentFieldDefinition } from "@thuya/framework";

class RoleContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "role");
    }
}

export default new RoleContentFieldDefinition();