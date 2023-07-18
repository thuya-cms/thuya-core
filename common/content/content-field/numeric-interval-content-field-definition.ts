import { GroupContentFieldDefinition, Logger, Result } from "@thuya/framework";
import commonNumericContentFieldDefinition from "./common-numeric-content-field-definition";

type NumericInterval = {
    from: number,
    to: number
}

/**
 * Content field definition for numeric intervals.
 */
class NumericIntervalContentFieldDefinition extends GroupContentFieldDefinition<NumericInterval> {
    protected filePath: string = __filename;
    
    
    private logger: Logger;
    
    
    
    constructor() {
        super("", "numeric-interval");

        this.logger = Logger.for(NumericIntervalContentFieldDefinition.name);

        this.addContentField("from", commonNumericContentFieldDefinition, { isRequired: true });
        this.addContentField("to", commonNumericContentFieldDefinition, { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: NumericInterval): Result {
        if (fieldValue.to < fieldValue.from) {
            this.logger.debug(`Invalid numeric interval "%s - %s".`, fieldValue.from, fieldValue.to);
            return Result.error(`Invalid numeric interval "${ fieldValue.from } - ${ fieldValue.to }".`);
        }

        return Result.success();
    }
}

export default new NumericIntervalContentFieldDefinition();