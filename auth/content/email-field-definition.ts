import { ContentFieldDefinition, ContentFieldType, ContentFieldTypes } from "@thuya/framework/content-management/domain/entity/content-field-definition";
import Email from "../domain/value-object/email";

class EmailFieldDefinition extends ContentFieldDefinition {
    constructor() {
        super("", "user-email", ContentFieldType.Text);

        this.addHandler(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: ContentFieldTypes) {
        new Email(contentFieldData.toString());
    }
}

export default new EmailFieldDefinition();