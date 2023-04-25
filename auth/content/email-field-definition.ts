import { ContentFieldDefinition, ContentFieldType, ContentFieldValue } from "@thuya/framework";
import Email from "../domain/value-object/email";

class EmailFieldDefinition extends ContentFieldDefinition {
    constructor() {
        super("", "user-email", ContentFieldType.Text);

        this.addValidator(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: ContentFieldValue) {
        new Email(contentFieldData.toString());
    }
}

export default new EmailFieldDefinition();