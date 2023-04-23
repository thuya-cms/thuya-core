import { ContentFieldDefinition, ContentFieldType, ContentFieldTypes } from "@thuya/framework/dist/content-management/domain/entity/content-field-definition";
import Password from "../domain/value-object/password";

class PasswordFieldDefinition extends ContentFieldDefinition {
    constructor() {
        super("", "user-password", ContentFieldType.Text);

        this.addValidator(this.validateFormat);
        this.addDetermination(this.hashPassword)
    }


    
    private validateFormat(contentFieldData: ContentFieldTypes) {
        new Password(contentFieldData.toString());
    }
    
    private hashPassword(contentFieldData: ContentFieldTypes) {
        let password = new Password(contentFieldData.toString());
        return password.value();
    }
}

export default new PasswordFieldDefinition();