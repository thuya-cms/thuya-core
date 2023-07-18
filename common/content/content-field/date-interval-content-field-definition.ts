import { GroupContentFieldDefinition, Result, Logger } from "@thuya/framework";
import commonDateContentFieldDefinition from "./common-date-content-field-definition";

type DateInterval = {
    startDate: Date,
    endDate: Date
}

/**
 * Content field definition for date intervals.
 */
class DateIntervalContentFieldDefinition extends GroupContentFieldDefinition<DateInterval> {
    protected filePath: string = __filename;
    
    private logger: Logger;
    
    
    
    constructor() {
        super("", "date-interval");

        this.logger = Logger.for(DateIntervalContentFieldDefinition.name);

        this.addContentField("startDate", commonDateContentFieldDefinition, { isRequired: true });
        this.addContentField("endDate", commonDateContentFieldDefinition, { isRequired: true });

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