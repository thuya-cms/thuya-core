import User from "./user";
import { ContentDefinition } from '@thuya/framework';
import emailFieldDefinition from "./email-field-definition";
import passwordFieldDefinition from "./password-field-definition";

class UserContentDefinition extends ContentDefinition<User> {
    constructor() {
        super("", "user");

        this.addContentField("email", emailFieldDefinition, { isRequired: true, isUnique: true });
        this.addContentField("password", passwordFieldDefinition, { isRequired: true });
    }
}

export default new UserContentDefinition();