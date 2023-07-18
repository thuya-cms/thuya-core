import { NumericContentFieldDefinition } from "@thuya/framework";

/**
 * Content field definition for simple numeric fields.
 */
class CommonNumericContentFieldDefinition extends NumericContentFieldDefinition {
    constructor() {
        super("", "common-numeric");
    }
}

export default new CommonNumericContentFieldDefinition();