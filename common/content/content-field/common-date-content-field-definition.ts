import { DateContentFieldDefinition } from "@thuya/framework";

/**
 * Content field definition for common date fields.
 */
class CommonDateContentFieldDefinition extends DateContentFieldDefinition {
    constructor() {
        super("", "common-date");
    }
}

export default new CommonDateContentFieldDefinition();