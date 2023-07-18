import AuthRestriction from "../content/content-definition/types/auth-restriction";

/**
 * Local cache for authorization restrictions.
 */
class RestrictionCache {
    private cache: {
        updatedAt: Date,
        contentDefinitionName: string,
        restriction: AuthRestriction
    }[] = [];
    private ttlMinutes = 10; 
    
    

    /**
     * Set an authorization restriction in the cache.
     * 
     * @param restriction the authorization restriction
     * @returns 
     */
    set(restriction: AuthRestriction): { updatedAt: Date, contentDefinitionName: string, restriction: AuthRestriction } {
        let existingCacheEntry = this.cache.find(cacheEntry => cacheEntry.contentDefinitionName === restriction.contentDefinitionName);
        
        if (existingCacheEntry) {
            existingCacheEntry.updatedAt = new Date();
        } else {
            existingCacheEntry = {
                updatedAt: new Date(),
                contentDefinitionName: restriction.contentDefinitionName,
                restriction: restriction
            };

            this.cache.push(existingCacheEntry);
        }

        return existingCacheEntry;
    }

    /**
     * Get a restriction from the cache.
     * 
     * @param restrictionName the target content definition name of the authorization restriction
     * @returns the authorization restriction or undefined
     */
    get(restrictionName: string): AuthRestriction | undefined {
        const existingCacheEntryIndex = this.cache.findIndex(cacheEntry => cacheEntry.contentDefinitionName === restrictionName);

        if (existingCacheEntryIndex === -1) {
            return undefined;
        } 
            
        const existingCacheEntry = this.cache[existingCacheEntryIndex];
        const earliestUpdatedAt = new Date();
        earliestUpdatedAt.setMinutes(earliestUpdatedAt.getMinutes() - this.ttlMinutes);

        if (existingCacheEntry.updatedAt < earliestUpdatedAt) {
            this.cache.splice(existingCacheEntryIndex, 1);
            return undefined;
        }

        return existingCacheEntry.restriction;
    }
}

export default new RestrictionCache();