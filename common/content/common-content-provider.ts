import { ContentProvider } from "@thuya/framework";
import { ContentFieldDefinition } from "@thuya/framework";
import dateIntervalContentFieldDefinition, { SingleDateContentFieldDefinition } from "./date-interval-content-field-definition";
import numericIntervalContentFieldDefinition, { SingleNumericContentFieldDefinition } from "./numeric-interval-content-field-definition";

class CommonContentProvider extends ContentProvider {
    override getContentFieldDefinitions(): ContentFieldDefinition[] {
        return [
            new SingleDateContentFieldDefinition(),
            new SingleNumericContentFieldDefinition(),

            dateIntervalContentFieldDefinition, 
            numericIntervalContentFieldDefinition
        ];
    }
}

export default new CommonContentProvider();