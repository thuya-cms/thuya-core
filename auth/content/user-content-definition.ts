import User from "./user";
import { ContentDefinition } from '@thuya/framework/dist/content-management/domain/entity/content-definition';
import emailFieldDefinition from "./email-field-definition";
import passwordFieldDefinition from "./password-field-definition";

class UserContentDefinition extends ContentDefinition<User> {
    constructor() {
        super("", "user");

        this.addContentField("email", emailFieldDefinition, { isRequired: true });
        this.addContentField("password", passwordFieldDefinition, { isRequired: true });
    }
}

export default new UserContentDefinition();