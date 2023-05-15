import { ContentProvider } from "@thuya/framework";
import { ContentFieldDefinition } from "@thuya/framework";
import dateIntervalContentFieldDefinition, { SingleDateContentFieldDefinition } from "./content-field/date-interval-content-field-definition";
import numericIntervalContentFieldDefinition, { SingleNumericContentFieldDefinition } from "./content-field/numeric-interval-content-field-definition";
import commonNumericContentFieldDefinition from "./content-field/common-numeric-content-field-definition";
import commonTextContentFieldDefinition from "./content-field/common-text-content-field-definition";
import commonDateContentFieldDefinition from "./content-field/common-date-content-field-definition";

class CommonContentProvider extends ContentProvider {
    override getContentFieldDefinitions(): ContentFieldDefinition[] {
        return [
            new SingleDateContentFieldDefinition(),
            new SingleNumericContentFieldDefinition(),

            commonNumericContentFieldDefinition,
            commonTextContentFieldDefinition,
            commonDateContentFieldDefinition,
            dateIntervalContentFieldDefinition, 
            numericIntervalContentFieldDefinition
        ];
    }
}

export default new CommonContentProvider();