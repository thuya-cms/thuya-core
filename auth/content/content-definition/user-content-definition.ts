import User from "./types/user";
import { ContentDefinition } from '@thuya/framework';
import emailFieldDefinition from "../content-field/email-content-field-definition";
import passwordFieldDefinition from "../content-field/password-content-field-definition";

/**
 * Content definition for users.
 */
class UserContentDefinition extends ContentDefinition<User> {
    constructor() {
        super("", "user");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true, isIndexed: true });
        this.addContentField("password", passwordFieldDefinition, { isRequired: true });
    }
}

export default new UserContentDefinition();