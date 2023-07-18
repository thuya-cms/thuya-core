import { ContentProvider, Module } from "@thuya/framework";
import commonContentProvider from "./content/common-content-provider";

/**
 * Module containing common content definitions and content field definitions.
 */
class CommonModule extends Module {
    /**
     * @inheritdoc
     */
    override getMetadata(): { name: string, version: number } {
        return {
            name: "common-module",
            version: 1
        };
    }

    /**
     * @inheritdoc
     */
    override getContentProviders(): ContentProvider[] {
        return [commonContentProvider];
    }
}

export default new CommonModule();