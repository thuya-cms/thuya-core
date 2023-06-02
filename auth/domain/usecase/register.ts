import User from "../../content/content-definition/types/user";
import userContentDefinition from "../../content/content-definition/user-content-definition";
import factory from "../factory";
import { contentManager, Logger } from "@thuya/framework";

class Register {
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(Register.toString());
    }



    async execute(email: string, password: string): Promise<{ token: string, expiresInSeconds: number }> {
        this.logger.debug("Start registration...");

        try {
            const user: User = {
                id: "",
                email: email,
                password: password
            };
            const createContentResult = await contentManager.createContent(userContentDefinition.getName(), user); // Expects a not hashed password.
            if (createContentResult.getIsFailing())
                throw new Error(createContentResult.getMessage());
    
    
            const jwtService = factory.getJwtService();
            const token = jwtService.createToken({
                email: email,
                roles: []
            });
    
            this.logger.debug("...Registration successful.");

            return {
                token: token,
                expiresInSeconds: jwtService.getExpiresInSeconds()
            };
        }

        catch (error) {
            this.logger.debug("...Registration failed.");
            throw error;
        }
    }
}

export default new Register();