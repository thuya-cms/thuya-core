import userContentDefinition from "../../content/content-definition/user-content-definition";
import Password from "../value-object/password";
import { contentManager, Logger, Result } from "@thuya/framework";
import factory from "../factory";
import roleAssignmentContentDefinition from "../../content/content-definition/role-assignment-content-definition";
import User from "../../content/content-definition/types/user";

/**
 * Use case to log in a user.
 */
class Login {
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(Login.name);
    }



    /**
     * Execute user login.
     * 
     * @param email email of the user
     * @param password password of the user
     * @returns a JWT token and the expiration date of it
     */
    async execute(email: string, password: string): Promise<Result<{ token: string, expiresInSeconds: number }>> {
        this.logger.debug("Start login...");

        try {
            const readUserContentResult = await this.readUserContent(email);
            if (readUserContentResult.getIsFailing()) {
                return Result.error(readUserContentResult.getMessage());
            }

            const readUserContent = readUserContentResult.getResult()!;

            const validatePasswordResult = this.validatePassword(readUserContent, password, email);
            if (validatePasswordResult.getIsFailing()) {
                return Result.error(validatePasswordResult.getMessage());
            }

            const roles = await this.readRoles(email);
    
            const jwtService = factory.getJwtService();
            const token = jwtService.createToken({
                email: email,
                roles: roles
            });
    
            this.logger.debug("...Login successful.");
    
            return Result.success({
                token: token,
                expiresInSeconds: jwtService.getExpiresInSeconds()
            });
        }

        catch (error: any) {
            this.logger.debug("...Login failed.");
            return Result.error(error.message);
        }
    }


    private async readUserContent(email: string): Promise<Result<User>> {
        const readUserContentResult = await contentManager.readContentByFieldValue(userContentDefinition.getName(), {
            name: "email",
            value: email
        });

        if (readUserContentResult.getIsFailing()) {
            this.logger.error(`User "%s" does not exist.`, email);
            return Result.error("Invalid login attempt.");
        }

        return Result.success(readUserContentResult.getResult()!);
    }

    private validatePassword(readUserContent: any, password: string, email: string): Result {
        const storedPasswordResult = Password.create(readUserContent.password, true);
        if (storedPasswordResult.getIsFailing()) {
            return Result.error("Stored password is not valid.");
        }

        const storedPassword = storedPasswordResult.getResult()!;
        const isPasswordMatching = storedPassword.compare(password);

        if (!isPasswordMatching) {
            this.logger.debug(`Invalid password for user "%s".`, email);
            this.logger.error("Invalid password.");
            return Result.error("Invalid login attempt.");
        }

        return Result.success();
    }

    private async readRoles(email: string): Promise<string[]> {
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