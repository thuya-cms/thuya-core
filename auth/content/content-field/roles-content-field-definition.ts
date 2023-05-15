import { ArrayContentFieldDefinition } from "@thuya/framework";
import roleContentFieldDefinition from "./role-content-field-definition";

class RolesContentFieldDefinition extends ArrayContentFieldDefinition<string> {
    constructor() {
        super("", "roles", roleContentFieldDefinition);
    }
}

export default new RolesContentFieldDefinition();