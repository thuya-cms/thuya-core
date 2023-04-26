import { TextContentFieldDefinition, ContentFieldValue } from "@thuya/framework";
import Email from "../domain/value-object/email";

class EmailFieldDefinition extends TextContentFieldDefinition {
    constructor() {
        super("", "user-email");

        this.addValidator(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: ContentFieldValue) {
        new Email(contentFieldData.toString());
    }
}

export default new EmailFieldDefinition();