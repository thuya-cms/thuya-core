import { logger } from "@thuya/framework";
import factory from "../factory";

class GuardUrl {
    execute(token: string) {
        try {
            factory.getJwtService().verifyToken(token);
        }

        catch (error: any) {
            logger.debug("Not authorized to access url. Invalid token.");
            throw error;
        }
    }
}

export default new GuardUrl();