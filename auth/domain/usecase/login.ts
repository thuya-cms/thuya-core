import userContentDefinition from "../../content/content-definition/user-content-definition";
import Email from "../value-object/email";
import Password from "../value-object/password";
import { contentManager, logger } from "@thuya/framework";
import factory from "../factory";
import roleContentDefinition from "../../content/content-definition/role-content-definition";

class Login {
    async execute(email: Email, password: string): Promise<string> {
        try {
            let roles: string[];
            const readUserContentResult = await contentManager.readContentByFieldValue(userContentDefinition.getName(), {
                name: "email",
                value: email.value()
            });

            if (readUserContentResult.getIsFailing()) {
                logger.error("Use does not exist.");
                throw new Error("Use does not exist.");
            }

            const readRoleResult = await contentManager.readContentByFieldValue(roleContentDefinition.getName(), {
                name: "email",
                value: email.value()
            });

            if (readRoleResult.getIsSuccessful()) 
                roles = readRoleResult.getResult().roles;
            else 
                roles = [];

            const storedPassword = new Password(readUserContentResult.getResult().password, true);
			const isPasswordMatching = storedPassword.compare(password);

			if (!isPasswordMatching) {
                logger.error("Invalid login attempt.");
				throw new Error("Invalid login credentials.");
			}

            const jwtService = factory.getJwtService();
			const token = jwtService.createToken({
                email: email.value(),
                roles: roles
            });

			return token;
		}

		catch(error: any) {
			logger.error(error.message);
			throw new Error("Unknown error during login.");
		}
    }
}

export default new Login();