import { TextContentFieldDefinition, Result } from "@thuya/framework";
import Email from "../../domain/value-object/email";

class EmailContentFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;



    constructor() {
        super("", "email");

        this.addValidator(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: string): Result {
        try {
            new Email(contentFieldData.toString());

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
}

export default new EmailContentFieldDefinition();