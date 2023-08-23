import { Module } from "@thuya/framework";

/**
 * Module containing common content definitions and content field definitions.
 */
class MailerModule extends Module {
    /**
     * @inheritdoc
     */
    override getMetadata(): { name: string, version: number } {
        return {
            name: "mailer-module",
            version: 1
        };
    }
}

export default new MailerModule();