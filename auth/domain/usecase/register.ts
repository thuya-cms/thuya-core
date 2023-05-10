import User from "../../content/user";
import userContentDefinition from "../../content/user-content-definition";
import factory from "../factory";
import Email from "../value-object/email";
import { contentManager } from "@thuya/framework";

class Register {
    async execute(email: Email, password: string): Promise<string> {
        const user: User = {
            id: "",
            email: email.value(),
            password: password
        };
        const createContentResult = await contentManager.createContent(userContentDefinition.getName(), user); // Expects a not hashed password.
        if (createContentResult.getIsFailing())
            throw new Error(createContentResult.getMessage());

        return factory.getJwtService().createToken({
            email: email.value(),
            roles: []
        });
    }
}

export default new Register();