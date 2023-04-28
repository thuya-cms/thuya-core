import { DateContentFieldDefinition, GroupContentFieldDefinition, IdentifiableError, contentHelper, logger } from "@thuya/framework";

enum ErrorCode {
    MissingDate = "missing-date",
    InvalidDate = "invalid-date",
    InvalidInterval = "invalid-interval"
}

class DateIntervalContentFieldDefinition extends GroupContentFieldDefinition {
    private startDateFieldName: string = "start-date";
    private endDateFieldName: string = "end-date";
    
    
    
    constructor() {
        super("", "date-interval");

        let dateContentFieldDefinition = new DateContentFieldDefinition("", "date");

        this.addContentField(this.startDateFieldName, dateContentFieldDefinition, { isRequired: true });
        this.addContentField(this.endDateFieldName, dateContentFieldDefinition, { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: any) {
        const startDateFieldName = contentHelper.getContentPropertyName("start-date", fieldValue);
        const endDateFieldName = contentHelper.getContentPropertyName("end-date", fieldValue);

        if (!startDateFieldName || !endDateFieldName) {
            logger.debug(`Start date or end date is missing from date interval.`);
            throw new IdentifiableError(ErrorCode.MissingDate, "Start or end date is missing.");
        }

        const startDateString: string = contentHelper.getFieldValue(startDateFieldName.toString(), fieldValue);
        const endDateString: string = contentHelper.getFieldValue(endDateFieldName.toString(), fieldValue);
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        if (endDate < startDate) {
            logger.debug(`Invalid date interval "%s - %s".`, startDateString, endDateString);
            throw new IdentifiableError(ErrorCode.InvalidInterval, `Invalid date interval "${ startDateString } - ${ endDateString }".`);
        }
    }
}

export default new DateIntervalContentFieldDefinition();
export { ErrorCode };