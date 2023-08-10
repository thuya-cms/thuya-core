import { TextContentFieldDefinition, Result } from "@thuya/framework";
import Email from "../../domain/value-object/email";

/**
 * Content field definition for email addresses.
 */
class EmailContentFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;



    constructor() {
        super("", "email");

        this.addValidator(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: string): Result {
        try {
            const emailResult = Email.create(contentFieldData.toString());
            if (emailResult.getIsFailing()) {
                return Result.error(emailResult.getMessage());
            }

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
}

export default new EmailContentFieldDefinition();