import { TextContentFieldDefinition, ContentFieldValue, Result } from "@thuya/framework";
import Password from "../domain/value-object/password";

class PasswordFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;
    
    
    
    constructor() {
        super("", "user-password");

        this.addValidator(this.validateFormat);
        this.addDetermination(this.hashPassword)
    }


    
    private validateFormat(contentFieldData: ContentFieldValue): Result {
        try {
            new Password(contentFieldData.toString());

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
    
    private hashPassword(contentFieldData: ContentFieldValue) {
        const password = new Password(contentFieldData.toString());
        return password.value();
    }
}

export default new PasswordFieldDefinition();