import { Logger, Result, contentManager } from "@thuya/framework";
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
     * @returns result
     * @async
     */
    async execute(token: string, contentName: string, operation: string): Promise<Result> {
        this.logger.debug(`Guarding request for content "%s", operation "%s"...`, contentName, operation);
        
        try {
            const superadminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;

            const authRestrictions = await this.listRestrictions(contentName, operation);

            if (authRestrictions.length === 0) {
                this.logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                this.logger.debug("...Guarding request successful.");
                return Result.success();
            }

            for (const authRestriction of authRestrictions) {
                if (!authRestriction.operations || !authRestriction.operations.includes(operation)) {
                    continue;
                }
                
                const payload = factory.getJwtService().verifyToken(token);
                
                if (superadminEmail && superadminEmail === payload.email) {
                    continue;
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
                        this.logger.debug(`Not authorized to access url.`);
                        return Result.error(`Not authorized to access url.`);
                    }
                }
            }
            
            this.logger.debug("User has the required authorization.");
            this.logger.debug("...Guarding request successful.");
            return Result.success();
        }

        catch (error: any) {
            this.logger.debug("...Guarding request failed.");
            return Result.error(error.message);
        }
    }


    private async listRestrictions(contentName: string, operation: string): Promise<AuthRestriction[]> {
        let authRestrictions: AuthRestriction[] = [];
        const cacheEntries = restrictionCache.list(contentName);

        if (cacheEntries) {
            this.logger.debug("Restriction found in cache.");
            authRestrictions = cacheEntries;
        } else {
            this.logger.debug("Restriction is not in the cache.");

            const listAuthRestrictionResult = await contentManager.listContentByFieldValue(
                authRestrictionContentDefinition.getName(),
                { name: "contentDefinitionName", value: contentName });
            if (listAuthRestrictionResult.getIsFailing()) {
                this.logger.debug(`No restriction for type "%s" operation "%s".`, contentName, operation);
                return [];
            }

            const authRestrictionList = listAuthRestrictionResult.getResult();
            if (!authRestrictionList) {
                return [];
            }

            for (const authRestriction of authRestrictionList) {
                authRestrictions.push(authRestriction);
            } 

            restrictionCache.set(contentName, authRestrictionList);
        }

        this.logger.debug(
            `Authorization restriction exists for "%s", operations "%s".`, 
            contentName, 
            operation);

        return authRestrictions;
    }
}

export default new GuardUrl();