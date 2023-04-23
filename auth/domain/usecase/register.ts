import User from "../../content/user";
import userContentDefinition from "../../content/user-content-definition";
import factory from "../factory";
import Email from "../value-object/email";
import contentManager from "@thuya/framework/dist/content-management/app/content-manager";

class Register {
    execute(email: Email, password: string): string {
        const user: User = {
            id: "",
            email: email.value(),
            password: password
        };
        contentManager.createContent(userContentDefinition.getName(), user); // Expects a not hashed password.

        return factory.getJwtService().createToken(user);
    }
}

export default new Register();