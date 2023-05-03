import { ContentProvider } from "@thuya/framework";
import { ContentFieldDefinitionDTO } from "@thuya/framework/dist/content-management/app/dto/content-field-definition/content-field-definition";
import dateIntervalContentFieldDefinition from "./date-interval-content-field-definition";
import numericIntervalContentFieldDefinition from "./numeric-interval-content-field-definition";

class CommonContentProvider extends ContentProvider {
    override getContentFieldDefinitions(): ContentFieldDefinitionDTO[] {
        return [dateIntervalContentFieldDefinition, numericIntervalContentFieldDefinition];
    }
}

export default new CommonContentProvider();