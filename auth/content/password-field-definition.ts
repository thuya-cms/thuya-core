import { ContentFieldDefinition, ContentFieldType, ContentFieldValue } from "@thuya/framework";
import Password from "../domain/value-object/password";

class PasswordFieldDefinition extends ContentFieldDefinition {
    constructor() {
        super("", "user-password", ContentFieldType.Text);

        this.addValidator(this.validateFormat);
        this.addDetermination(this.hashPassword)
    }


    
    private validateFormat(contentFieldData: ContentFieldValue) {
        new Password(contentFieldData.toString());
    }
    
    private hashPassword(contentFieldData: ContentFieldValue) {
        let password = new Password(contentFieldData.toString());
        return password.value();
    }
}

export default new PasswordFieldDefinition();