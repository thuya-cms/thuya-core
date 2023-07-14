import { TextContentFieldDefinition, Result } from "@thuya/framework";
import Password from "../../domain/value-object/password";

class PasswordContentFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;
    
    
    
    constructor() {
        super("", "password");

        this.addValidator(this.validateFormat);
        this.addDetermination(this.hashPassword)
    }


    
    private validateFormat(contentFieldData: string): Result {
        try {
            new Password(contentFieldData.toString());

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
    
    private hashPassword(contentFieldData: string) {
        const password = new Password(contentFieldData.toString());
        return password.value();
    }
}

export default new PasswordContentFieldDefinition();