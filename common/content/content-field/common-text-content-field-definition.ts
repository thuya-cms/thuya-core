import { TextContentFieldDefinition } from "@thuya/framework";

/**
 * Content field definition for simple text fields.
 */
class CommonTextContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "common-text");
    }
}

export default new CommonTextContentFieldDefinition();