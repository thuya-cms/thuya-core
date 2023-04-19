import User from "./user";
import { ContentFieldDefinition, ContentFieldType } from '@thuya/framework/content-management/domain/entity/content-field-definition';
import { ContentDefinition } from '@thuya/framework/content-management/domain/entity/content-definition';

class UserContentDefinition extends ContentDefinition<User> {
    constructor() {
        super("", "user");

        let emailFieldDefinition = new ContentFieldDefinition("", "user-email", ContentFieldType.Text);
        emailFieldDefinition.setIsRequired(true);
        this.addContentField(emailFieldDefinition);
        
        let passwordFieldDefinition = new ContentFieldDefinition("", "user-password", ContentFieldType.Text);
        passwordFieldDefinition.setIsRequired(true);
        this.addContentField(passwordFieldDefinition);
    }
}

export default new UserContentDefinition();