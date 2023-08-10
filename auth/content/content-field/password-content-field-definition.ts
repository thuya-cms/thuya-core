import { TextContentFieldDefinition, Result } from "@thuya/framework";
import Password from "../../domain/value-object/password";

/**
 * Content field definition for passwords.
 */
class PasswordContentFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;
    
    
    
    constructor() {
        super("", "password");

        this.addValidator(this.validateFormat);
        this.addDetermination(this.hashPassword)
    }


    
    private validateFormat(contentFieldData: string): Result {
        try {
            const passwordResult = Password.create(contentFieldData.toString());
            if (passwordResult.getIsFailing()) {
                return Result.error(passwordResult.getMessage());
            }

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
    
    private hashPassword(contentFieldData: string): string {
        const passwordResult = Password.create(contentFieldData.toString());
        
        return passwordResult.getResult()!.value();
    }
}

export default new PasswordContentFieldDefinition();