import { contentManager, expressHelper, logger } from "@thuya/framework";
import factory from "../factory";
import authRestrictionContentDefinition from "../../content/auth-restriction-content-definition";
import AuthRestriction from "../../content/auth-restriction";

class GuardUrl {
    execute(token: string, contentName: string, operation: string) {
        try {
            let authRestriction: AuthRestriction  | undefined;
            let superadminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;

            let payload = factory.getJwtService().verifyToken(token);

            if (superadminEmail && superadminEmail === payload.email) {
                logger.debug("Superadmin access.");
                return;
            }

            try {
                authRestriction = contentManager.readContentByFieldValue(
                    authRestrictionContentDefinition.getName(),
                    { name: "contentDefinitionName", value: contentName });
            }

            catch (error: any) {
            }

            if (!authRestriction || !authRestriction.operations.includes(operation)) {
                logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return;
            }

            if (authRestriction.roles && authRestriction.roles.length > 0) {
                let hasRole: boolean = true;
                authRestriction.roles.forEach(requiredRole => {
                    if (payload.roles.includes(requiredRole)) {
                        hasRole = true;
                    }
                });

                if (!hasRole) {
                    throw new Error("Not authorized to access url.");
                }
            }
        }

        catch (error: any) {
            logger.debug("Not authorized to access url.");
            throw error;
        }
    }
}

export default new GuardUrl();