import { ArrayContentFieldDefinition } from "@thuya/framework";
import roleContentFieldDefinition from "./role-content-field-definition";

class RolesContentFieldDefinition extends ArrayContentFieldDefinition {
    constructor() {
        super("", "roles", roleContentFieldDefinition);
    }
}

export default new RolesContentFieldDefinition();