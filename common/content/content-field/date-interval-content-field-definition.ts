import { DateContentFieldDefinition, GroupContentFieldDefinition, Result, Logger } from "@thuya/framework";

type DateInterval = {
    startDate: Date,
    endDate: Date
}

class SingleDateContentFieldDefinition extends DateContentFieldDefinition {
    constructor() {
        super("", "date");
    }
}

class DateIntervalContentFieldDefinition extends GroupContentFieldDefinition<DateInterval> {
    private startDateFieldName = "startDate";
    private endDateFieldName = "endDate";
    private logger: Logger;

    protected filePath: string = __filename;
    
    
    
    constructor() {
        super("", "date-interval");

        this.logger = Logger.for(DateIntervalContentFieldDefinition.name);

        this.addContentField(this.startDateFieldName, new SingleDateContentFieldDefinition(), { isRequired: true });
        this.addContentField(this.endDateFieldName, new SingleDateContentFieldDefinition(), { isRequired: true });

        this.addValidator(this.validateInterval);
    }



    private validateInterval(fieldValue: DateInterval): Result {
        if (fieldValue.endDate < fieldValue.startDate) {
            this.logger.debug(`Invalid date interval "%s - %s".`, fieldValue.startDate, fieldValue.endDate);
            return Result.error(`Invalid date interval "${ fieldValue.startDate } - ${ fieldValue.endDate }".`);
        }

        return Result.success();
    }
}

export default new DateIntervalContentFieldDefinition();
export { SingleDateContentFieldDefinition };