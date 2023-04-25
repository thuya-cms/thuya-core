import { ContentDefinition, ContentProvider } from "@thuya/framework";
import userContentDefinition from "./user-content-definition";

class AuthContentProvider extends ContentProvider {
    public getContentDefinitions(): ContentDefinition<any>[] {
        return [userContentDefinition];
    }
}

export default new AuthContentProvider();