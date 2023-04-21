import logger from "@thuya/framework/dist/util/logger";
import userContentDefinition from "../../content/user-content-definition";
import Email from "../value-object/email";
import Password from "../value-object/password";
import contentManager from "@thuya/framework/dist/content-management/app/content-manager";
import IdentifiableError from "@thuya/framework/dist/identifiable-error";
import factory from "../factory";

enum ErrorCode {
    InvalidLoginCredentials = "invalid-login",
    UnknownError = "unknown-error"
}

class Login {
    execute(email: Email, password: Password): string {
        try {
            let userContent = contentManager.readContentByFieldValue(userContentDefinition.getName(), {
                name: "email",
                value: email.value()
            });
			const isPasswordMatching = password.compare(userContent.password);

			if (!isPasswordMatching) {
                logger.error("Invalid login attempt.");
				throw new IdentifiableError(ErrorCode.InvalidLoginCredentials, "Invalid login credentials.");
			}

            const jwtService = factory.getJwtService();
			const token = jwtService.createToken(userContent);

			return token;
		}

		catch(error: any) {
			logger.error(error.message);
			throw new IdentifiableError(ErrorCode.UnknownError, "Unknown error during login.");
		}
    }
}

export default new Login();