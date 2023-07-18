import { contentManager } from "@thuya/framework";
import login from "../domain/usecase/login";
import register from "../domain/usecase/register";
import roleAssignmentContentDefinition from "../content/content-definition/role-assignment-content-definition";
import Role from "../content/content-definition/types/role";
import authRestrictionContentDefinition from "../content/content-definition/auth-restriction-content-definition";
import AuthRestriction from "../content/content-definition/types/auth-restriction";

/**
 * Manager for authentication and authorization.
 */
class AuthManager {
    /**
     * Login a user.
     * 
     * @param email email of the user
     * @param password password of the user
     * @returns the token and expiry seconds 
     * @async
     */
    async login(email: string, password: string): Promise<{ token: string, expiresInSeconds: number }> {
        return await login.execute(email, password);
    }

    /**
     * Register a user.
     * 
     * @param email email of the user
     * @param password password of the user
     * @returns the token and expiry seconds 
     * @async
     */
    async register(email: string, password: string): Promise<{ token: string, expiresInSeconds: number }> {
        return await register.execute(email, password);
    }

    /**
     * Set roles to a user. 
     * Existing roles are overwritten.
     * 
     * @param email email address of the user
     * @param roles roles to assign to the user
     * @async
     */
    async setUserRoles(email: string, roles: string[]): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        let isUpdate: boolean = false;
        const roleAssignment: Role = {
            email: email,
            roles: roles
        };

        const readResult = await contentManager.readContentByFieldValue(roleAssignmentContentDefinition.getName(), { name: "email", value: email });
        if (readResult.getIsSuccessful()) {
            isUpdate = true;
        } 

        if (isUpdate) {
            const updateResult = await contentManager.updateContent(roleAssignmentContentDefinition.getName(), roleAssignment);
            if (updateResult.getIsFailing()) {
                throw new Error(updateResult.getMessage());
            }
        } else {
            const createResult = await contentManager.createContent(roleAssignmentContentDefinition.getName(), roleAssignment);
            if (createResult.getIsFailing()) {
                throw new Error(createResult.getMessage());
            }
        }
    }

    /**
     * Create an authorization restriction.
     * 
     * @param contentDefinitionName name of the content definition to restrict
     * @param authorizedRoles roles that are allowed to access the data of the content definition
     * @param operations operations that are restricted by the authorization restriction
     * @async
     */
    async createAuthRestriction(contentDefinitionName: string, authorizedRoles: string[], operations: string[]): Promise<void> {
        const authRestriction: AuthRestriction = {
            contentDefinitionName: contentDefinitionName,
            authorizedRoles: authorizedRoles,
            operations: operations
        };
        
        const createResult = await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
        if (createResult.getIsFailing()) {
            throw new Error(createResult.getMessage());
        }
    }
}

export default new AuthManager();