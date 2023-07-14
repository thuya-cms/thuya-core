import { ContentProvider, Module } from "@thuya/framework";
import commonContentProvider from "./content/common-content-provider";

class CommonModule extends Module {
    override getMetadata(): { name: string, version: number } {
        return {
            name: "common-module",
            version: 1
        };
    }

    override getContentProviders(): ContentProvider[] {
        return [commonContentProvider];
    }
}

export default new CommonModule();