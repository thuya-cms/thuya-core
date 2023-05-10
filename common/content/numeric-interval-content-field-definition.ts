import { GroupContentFieldDefinition, NumericContentFieldDefinition, Result, contentHelper, logger } from "@thuya/framework";

enum ErrorCode {
    MissingNumber = "missing-number",
    InvalidNumber = "invalid-number",
    InvalidInterval = "invalid-interval"
}

class SingleNumericContentFieldDefinition extends NumericContentFieldDefinition {
    constructor() {
        super("", "number");
    }
}

class NumericIntervalContentFieldDefinition extends GroupContentFieldDefinition {
    constructor() {
        super("", "numeric-interval");

        this.addContentField("from", new SingleNumericContentFieldDefinition(), { isRequired: true });
        this.addContentField("to", new SingleNumericContentFieldDefinition(), { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: any): Result {
        const startDateFieldName = contentHelper.getContentPropertyName("from", fieldValue);
        const endDateFieldName = contentHelper.getContentPropertyName("to", fieldValue);

        if (!startDateFieldName || !endDateFieldName) {
            logger.debug(`From or to value is missing from interval.`);
            return Result.error(`From or to value is missing from interval.`);
        }

        const fromString: string = contentHelper.getFieldValue(startDateFieldName.toString(), fieldValue);
        const toString: string = contentHelper.getFieldValue(endDateFieldName.toString(), fieldValue);
        const from = Number(fromString);
        const to = Number(toString);

        if (to < from) {
            logger.debug(`Invalid numeric interval "%s - %s".`, fromString, toString);
            return Result.error(`Invalid numeric interval "${ fromString } - ${ toString }".`);
        }

        return Result.success();
    }
}

export default new NumericIntervalContentFieldDefinition();
export { ErrorCode, SingleNumericContentFieldDefinition };