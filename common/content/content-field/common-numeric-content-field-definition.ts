import { NumericContentFieldDefinition } from "@thuya/framework";

class CommonNumericContentFieldDefinition extends NumericContentFieldDefinition {
    constructor() {
        super("", "common-numeric");
    }
}

export default new CommonNumericContentFieldDefinition();