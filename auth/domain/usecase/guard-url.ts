import { Logger, contentManager } from "@thuya/framework";
import factory from "../factory";
import authRestrictionContentDefinition from "../../content/content-definition/auth-restriction-content-definition";
import AuthRestriction from "../../content/content-definition/types/auth-restriction";
import restrictionCache from "../../service/restriction-cache";

/**
 * Use case to guard an URL based on authorization restrictions.
 */
class GuardUrl {
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(GuardUrl.name);
    }



    /**
     * Execute the authorization guard.
     * 
     * @param token the JWT token of the session
     * @param contentName name of the requested content definition
     * @param operation executed operation
     * @async
     */
    async execute(token: string, contentName: string, operation: string): Promise<void> {
        this.logger.debug(`Guarding request for content "%s", operation "%s"...`, contentName, operation);
        
        try {
            const superadminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;

            const authRestriction = await this.readRestriction(contentName, operation);

            if (!authRestriction || !authRestriction.operations || !authRestriction.operations.includes(operation)) {
                this.logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                this.logger.debug("...Guarding request successful.");
                return;
            }
            
            const payload = factory.getJwtService().verifyToken(token);
            
            if (superadminEmail && superadminEmail === payload.email) {
                this.logger.debug("Superadmin access.");
                this.logger.debug("...Guarding request successful.");
                return;
            }

            if (authRestriction.authorizedRoles && authRestriction.authorizedRoles.length > 0) {
                let hasRole = false;
                for (const requiredRole of authRestriction.authorizedRoles) {
                    if (payload.roles.includes(requiredRole)) {
                        hasRole = true;
                        break;
                    }
                }

                if (!hasRole) {
                    throw new Error("Not authorized to access url.");
                }
            }

            this.logger.debug("User has the required authorization.");
            this.logger.debug("...Guarding request successful.");
        }

        catch (error: any) {
            this.logger.debug("...Guarding request failed.");
            throw error;
        }
    }


    private async readRestriction(contentName: string, operation: string): Promise<AuthRestriction | undefined> {
        let authRestriction: AuthRestriction;
        const cacheEntry = restrictionCache.get(contentName);

        if (cacheEntry) {
            this.logger.debug("Restriction found in cache.");
            authRestriction = cacheEntry;
        } else {
            this.logger.debug("Restriction is not in the cache.");

            const readAuthRestrictionResult = await contentManager.readContentByFieldValue(
                authRestrictionContentDefinition.getName(),
                { name: "contentDefinitionName", value: contentName });
    
            if (readAuthRestrictionResult.getIsFailing()) {
                this.logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return undefined;
            }

            authRestriction = readAuthRestrictionResult.getResult();
            restrictionCache.set(authRestriction);
        }

        this.logger.debug(
            `Authorization restriction exists for "%s", operations "%s", roles "%s".`, 
            authRestriction.contentDefinitionName, 
            authRestriction.operations, 
            authRestriction.authorizedRoles);

        return authRestriction;
    }
}

export default new GuardUrl();