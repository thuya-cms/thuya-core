import userContentDefinition from "../../content/content-definition/user-content-definition";
import Password from "../value-object/password";
import { contentManager, logger } from "@thuya/framework";
import factory from "../factory";
import roleAssignmentContentDefinition from "../../content/content-definition/role-assignment-content-definition";

class Login {
    async execute(email: string, password: string): Promise<string> {
        const readUserContent = await this.readUserContent(email);
        this.validatePassword(readUserContent, password, email);
        const roles = await this.readRoles(email);

        const jwtService = factory.getJwtService();
        const token = jwtService.createToken({
            email: email,
            roles: roles
        });

        return token;
    }


    private async readUserContent(email: string) {
        const readUserContentResult = await contentManager.readContentByFieldValue(userContentDefinition.getName(), {
            name: "email",
            value: email
        });

        if (readUserContentResult.getIsFailing()) {
            logger.debug(`User "%s" does not exist.`, email);
            logger.error("User does not exist.");
            throw new Error("Invalid login attempt.");
        }

        return readUserContentResult.getResult()!;
    }

    private validatePassword(readUserContent: any, password: string, email: string) {
        const storedPassword = new Password(readUserContent.password, true);
        const isPasswordMatching = storedPassword.compare(password);

        if (!isPasswordMatching) {
            logger.debug(`Invalid password for user "%s".`, email);
            logger.error("Invalid password.");
            throw new Error("Invalid login attempt.");
        }
    }

    private async readRoles(email: string) {
        const readRoleResult = await contentManager.readContentByFieldValue(roleAssignmentContentDefinition.getName(), {
            name: "email",
            value: email
        });

        if (readRoleResult.getIsFailing())
            return [];
        
        return readRoleResult.getResult().roles;
    }
}

export default new Login();