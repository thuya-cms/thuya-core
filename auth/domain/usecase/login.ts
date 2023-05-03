import logger from "@thuya/framework/dist/util/logger";
import userContentDefinition from "../../content/user-content-definition";
import Email from "../value-object/email";
import Password from "../value-object/password";
import contentManager from "@thuya/framework/dist/content-management/app/content-manager";
import IdentifiableError from "@thuya/framework/dist/identifiable-error";
import factory from "../factory";
import roleContentDefinition from "../../content/role-content-definition";
import Role from "../../content/role";

enum ErrorCode {
    InvalidLoginCredentials = "invalid-login",
    UnknownError = "unknown-error"
}

class Login {
    execute(email: Email, password: string): string {
        try {
            let roles: string[];
            const readUserContentResult = contentManager.readContentByFieldValue(userContentDefinition.getName(), {
                name: "email",
                value: email.value()
            });

            if (readUserContentResult.getIsFailing()) {
                logger.error("Use does not exist.");
                throw new Error("Use does not exist.");
            }

            const readRoleResult = contentManager.readContentByFieldValue(roleContentDefinition.getName(), {
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
				throw new IdentifiableError(ErrorCode.InvalidLoginCredentials, "Invalid login credentials.");
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
			throw new IdentifiableError(ErrorCode.UnknownError, "Unknown error during login.");
		}
    }
}

export default new Login();