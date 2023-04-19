import { ContentDefinition } from "@thuya/framework/content-management/domain/entity/content-definition";
import ContentProvider from "@thuya/framework/content-provider";
import userContentDefinition from "./user-content-definition";

class AuthContentProvider extends ContentProvider {
    public getContentDefinitions(): ContentDefinition<any>[] {
        return [userContentDefinition];
    }
}

export default new AuthContentProvider();