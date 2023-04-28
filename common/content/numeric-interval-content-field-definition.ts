import { GroupContentFieldDefinition, IdentifiableError, NumericContentFieldDefinition, contentHelper, logger } from "@thuya/framework";

enum ErrorCode {
    MissingNumber = "missing-number",
    InvalidNumber = "invalid-number",
    InvalidInterval = "invalid-interval"
}

class NumericIntervalContentFieldDefinition extends GroupContentFieldDefinition {
    constructor() {
        super("", "numeric-interval");

        let numberContentFieldDefinition = new NumericContentFieldDefinition("", "number");

        this.addContentField("from", numberContentFieldDefinition, { isRequired: true });
        this.addContentField("to", numberContentFieldDefinition, { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: any) {
        const startDateFieldName = contentHelper.getContentPropertyName("from", fieldValue);
        const endDateFieldName = contentHelper.getContentPropertyName("to", fieldValue);

        if (!startDateFieldName || !endDateFieldName) {
            logger.debug(`From or to value is missing from interval.`);
            throw new IdentifiableError(ErrorCode.MissingNumber, "From or to value is missing.");
        }

        const fromString: string = contentHelper.getFieldValue(startDateFieldName.toString(), fieldValue);
        const toString: string = contentHelper.getFieldValue(endDateFieldName.toString(), fieldValue);
        const from = Number(fromString);
        const to = Number(toString);

        if (to < from) {
            logger.debug(`Invalid numeric interval "%s - %s".`, fromString, toString);
            throw new IdentifiableError(ErrorCode.InvalidInterval, `Invalid numeric interval "${ fromString } - ${ toString }".`);
        }
    }
}

export default new NumericIntervalContentFieldDefinition();
export { ErrorCode };