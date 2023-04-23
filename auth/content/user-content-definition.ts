import User from "./user";
import { ContentDefinition } from '@thuya/framework/dist/content-management/domain/entity/content-definition';
import emailFieldDefinition from "./email-field-definition";
import passwordFieldDefinition from "./password-field-definition";

class UserContentDefinition extends ContentDefinition<User> {
    constructor() {
        super("", "user");

        this.addContentField(emailFieldDefinition);
        this.addContentField(passwordFieldDefinition);
    }
}

export default new UserContentDefinition();