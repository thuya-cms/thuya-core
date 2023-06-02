import userContentDefinition from "../../content/content-definition/user-content-definition";
import Password from "../value-object/password";
import { contentManager, Logger } from "@thuya/framework";
import factory from "../factory";
import roleAssignmentContentDefinition from "../../content/content-definition/role-assignment-content-definition";

class Login {
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(Login.toString());
    }



    async execute(email: string, password: string): Promise<{ token: string, expiresInSeconds: number }> {
        this.logger.debug("Start login...");

        try {
            const readUserContent = await this.readUserContent(email);
            this.validatePassword(readUserContent, password, email);
            const roles = await this.readRoles(email);
    
            const jwtService = factory.getJwtService();
            const token = jwtService.createToken({
                email: email,
                roles: roles
            });
    
            this.logger.debug("...Login successful.");
    
            return {
                token: token,
                expiresInSeconds: jwtService.getExpiresInSeconds()
            };
        }

        catch (error) {
            this.logger.debug("...Login failed.");
            throw error;
        }
    }


    private async readUserContent(email: string) {
        const readUserContentResult = await contentManager.readContentByFieldValue(userContentDefinition.getName(), {
            name: "email",
            value: email
        });

        if (readUserContentResult.getIsFailing()) {
            this.logger.error(`User "%s" does not exist.`, email);
            throw new Error("Invalid login attempt.");
        }

        return readUserContentResult.getResult()!;
    }

    private validatePassword(readUserContent: any, password: string, email: string) {
        const storedPassword = new Password(readUserContent.password, true);
        const isPasswordMatching = storedPassword.compare(password);

        if (!isPasswordMatching) {
            this.logger.debug(`Invalid password for user "%s".`, email);
            this.logger.error("Invalid password.");
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