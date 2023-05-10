import { contentManager, logger } from "@thuya/framework";
import factory from "../factory";
import authRestrictionContentDefinition from "../../content/auth-restriction-content-definition";

class GuardUrl {
    async execute(token: string, contentName: string, operation: string) {
        try {
            const superadminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;

            const readAuthRestrictionResult = await contentManager.readContentByFieldValue(
                authRestrictionContentDefinition.getName(),
                { name: "contentDefinitionName", value: contentName });

            if (readAuthRestrictionResult.getIsFailing()) {
                logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return;
            }

            const authRestriction = readAuthRestrictionResult.getResult();
            logger.debug(
                `Authorization restriction exists for "%s", operations "%s", roles "%s".`, 
                authRestriction.contentDefinitionName, 
                authRestriction.operations, 
                authRestriction.roles);

            if (!authRestriction.operations || !authRestriction.operations.includes(operation)) {
                logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return;
            }

            const payload = factory.getJwtService().verifyToken(token);

            if (superadminEmail && superadminEmail === payload.email) {
                logger.debug("Superadmin access.");
                return;
            }

            if (authRestriction.roles && authRestriction.roles.length > 0) {
                let hasRole = false;
                for (const requiredRole of authRestriction.roles) {
                    if (payload.roles.includes(requiredRole)) {
                        hasRole = true;
                        break;
                    }
                }

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