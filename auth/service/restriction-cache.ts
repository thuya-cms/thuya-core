import AuthRestriction from "../content/content-definition/types/auth-restriction";

/**
 * Local cache for authorization restrictions.
 */
class RestrictionCache {
    private cache: {
        updatedAt: Date,
        contentDefinitionName: string,
        restrictions: AuthRestriction[]
    }[] = [];
    private ttlMinutes = 10; 
    
    

    /**
     * Set an authorization restriction in the cache.
     * 
     * @param contentDefinitionName name of te content definition
     * @param restrictions the authorization restrictions
     * @returns 
     */
    set(contentDefinitionName: string, restrictions: AuthRestriction[]): { updatedAt: Date, contentDefinitionName: string, restrictions: AuthRestriction[] } {
        let existingCacheEntry = this.cache.find(cacheEntry => cacheEntry.contentDefinitionName === contentDefinitionName);
        
        if (existingCacheEntry) {
            existingCacheEntry.updatedAt = new Date();
        } else {
            existingCacheEntry = {
                updatedAt: new Date(),
                contentDefinitionName: contentDefinitionName,
                restrictions: restrictions
            };

            this.cache.push(existingCacheEntry);
        }

        return existingCacheEntry;
    }

    /**
     * List restrictions from the cache.
     * 
     * @param restrictionName the target content definition name of the authorization restriction
     * @returns the authorization restrictions or undefined
     */
    list(restrictionName: string): AuthRestriction[] | undefined {
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

        return existingCacheEntry.restrictions;
    }

    /**
     * Clear the cache.
     */
    clear(): void {
        this.cache = [];
    }
}

export default new RestrictionCache();