import { ContentProvider, Module } from "@thuya/framework";
import commonContentProvider from "./content/common-content-provider";

class CommonModule extends Module {
    override getContentProviders(): ContentProvider[] {
        return [commonContentProvider];
    }
}

export default new CommonModule();