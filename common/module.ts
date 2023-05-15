import { ContentProvider, Module } from "@thuya/framework";
import commonContentProvider from "./content/common-content-provider";

class CommonModule extends Module {
    override getMetadata(): { name: string; } {
        return {
            name: "common-module"
        };
    }

    override getContentProviders(): ContentProvider[] {
        return [commonContentProvider];
    }
}

export default new CommonModule();