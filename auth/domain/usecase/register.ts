import User from "../../content/content-definition/types/user";
import userContentDefinition from "../../content/content-definition/user-content-definition";
import factory from "../factory";
import { contentManager } from "@thuya/framework";

class Register {
    async execute(email: string, password: string): Promise<string> {
        const user: User = {
            id: "",
            email: email,
            password: password
        };
        const createContentResult = await contentManager.createContent(userContentDefinition.getName(), user); // Expects a not hashed password.
        if (createContentResult.getIsFailing())
            throw new Error(createContentResult.getMessage());

        return factory.getJwtService().createToken({
            email: email,
            roles: []
        });
    }
}

export default new Register();