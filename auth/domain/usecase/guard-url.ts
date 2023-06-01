import { contentManager, logger } from "@thuya/framework";
import factory from "../factory";
import authRestrictionContentDefinition from "../../content/content-definition/auth-restriction-content-definition";
import AuthRestriction from "../../content/content-definition/types/auth-restriction";
import restrictionCache from "../../service/restriction-cache";

class GuardUrl {
    async execute(token: string, contentName: string, operation: string) {
        logger.debug("Guarding request...");
        
        try {
            const superadminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;

            const authRestriction = await this.readRestriction(contentName, operation);

            if (!authRestriction || !authRestriction.operations || !authRestriction.operations.includes(operation)) {
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

            logger.debug("...Guarding request successful.");
        }

        catch (error: any) {
            logger.debug("...Guarding request failed.");
            throw error;
        }
    }


    private async readRestriction(contentName: string, operation: string): Promise<AuthRestriction | undefined> {
        let authRestriction: AuthRestriction;
        const cacheEntry = restrictionCache.get(contentName);

        if (cacheEntry) {
            logger.debug("Restriction found in cache.");
            authRestriction = cacheEntry;
        } else {
            logger.debug("Restriction is not in the cache.");

            const readAuthRestrictionResult = await contentManager.readContentByFieldValue(
                authRestrictionContentDefinition.getName(),
                { name: "contentDefinitionName", value: contentName });
    
            if (readAuthRestrictionResult.getIsFailing()) {
                logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return undefined;
            }

            authRestriction = readAuthRestrictionResult.getResult();
            restrictionCache.set(authRestriction);
        }

        logger.debug(
            `Authorization restriction exists for "%s", operations "%s", roles "%s".`, 
            authRestriction.contentDefinitionName, 
            authRestriction.operations, 
            authRestriction.roles);

        return authRestriction;
    }
}

export default new GuardUrl();