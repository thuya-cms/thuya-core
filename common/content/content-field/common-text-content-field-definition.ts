import { TextContentFieldDefinition } from "@thuya/framework";

class CommonTextContentFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "common-text");
    }
}

export default new CommonTextContentFieldDefinition();