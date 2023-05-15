import { GroupContentFieldDefinition, NumericContentFieldDefinition, Result, contentHelper, logger } from "@thuya/framework";

type NumericInterval = {
    from: number,
    to: number
}

class SingleNumericContentFieldDefinition extends NumericContentFieldDefinition {
    constructor() {
        super("", "number");
    }
}

class NumericIntervalContentFieldDefinition extends GroupContentFieldDefinition<NumericInterval> {
    protected filePath: string = __filename;
    
    
    
    constructor() {
        super("", "numeric-interval");

        this.addContentField("from", new SingleNumericContentFieldDefinition(), { isRequired: true });
        this.addContentField("to", new SingleNumericContentFieldDefinition(), { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: NumericInterval): Result {
        if (fieldValue.to < fieldValue.from) {
            logger.debug(`Invalid numeric interval "%s - %s".`, fieldValue.from, fieldValue.to);
            return Result.error(`Invalid numeric interval "${ fieldValue.from } - ${ fieldValue.to }".`);
        }

        return Result.success();
    }
}

export default new NumericIntervalContentFieldDefinition();
export { SingleNumericContentFieldDefinition };