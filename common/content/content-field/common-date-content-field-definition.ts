import { DateContentFieldDefinition } from "@thuya/framework";

class CommonDateContentFieldDefinition extends DateContentFieldDefinition {
    constructor() {
        super("", "common-date");
    }
}

export default new CommonDateContentFieldDefinition();