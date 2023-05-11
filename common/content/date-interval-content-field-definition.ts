import { DateContentFieldDefinition, GroupContentFieldDefinition, Result, contentHelper, logger } from "@thuya/framework";

enum ErrorCode {
    MissingDate = "missing-date",
    InvalidDate = "invalid-date",
    InvalidInterval = "invalid-interval"
}

class SingleDateContentFieldDefinition extends DateContentFieldDefinition {
    constructor() {
        super("", "date");
    }
}

class DateIntervalContentFieldDefinition extends GroupContentFieldDefinition {
    private startDateFieldName = "startDate";
    private endDateFieldName = "endDate";
    
    
    
    constructor() {
        super("", "date-interval");

        this.addContentField(this.startDateFieldName, new SingleDateContentFieldDefinition(), { isRequired: true });
        this.addContentField(this.endDateFieldName, new SingleDateContentFieldDefinition(), { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: any): Result {
        const startDateFieldName = contentHelper.getContentPropertyName("startDate", fieldValue);
        const endDateFieldName = contentHelper.getContentPropertyName("endDate", fieldValue);

        if (!startDateFieldName || !endDateFieldName) {
            logger.debug(`Start date or end date is missing from date interval.`);
            return Result.error(`Start date or end date is missing from date interval.`);
        }

        const startDateString: string = contentHelper.getFieldValue(startDateFieldName.toString(), fieldValue);
        const endDateString: string = contentHelper.getFieldValue(endDateFieldName.toString(), fieldValue);
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        if (endDate < startDate) {
            logger.debug(`Invalid date interval "%s - %s".`, startDateString, endDateString);
            return Result.error(`Invalid date interval "${ startDateString } - ${ endDateString }".`);
        }

        return Result.success();
    }
}

export default new DateIntervalContentFieldDefinition();
export { ErrorCode, SingleDateContentFieldDefinition };