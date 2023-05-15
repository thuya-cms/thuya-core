import { TextContentFieldDefinition, Result, ContentFieldValue } from "@thuya/framework";
import Email from "../domain/value-object/email";

class EmailFieldDefinition extends TextContentFieldDefinition {
    protected filePath: string = __filename;



    constructor() {
        super("", "user-email");

        this.addValidator(this.validateFormat);
    }


    
    private validateFormat(contentFieldData: ContentFieldValue): Result {
        try {
            new Email(contentFieldData.toString());

            return Result.success();
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }
}

export default new EmailFieldDefinition();