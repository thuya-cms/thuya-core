import { TextContentFieldDefinition, contentDefinitionManager, contentManager, thuyaApp } from "@thuya/framework";
import { authModule, roleAssignmentContentDefinition } from "../../../auth";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";
import guardUrl from "../../../auth/domain/usecase/guard-url";
import register from "../../../auth/domain/usecase/register";
import { expect } from "chai";
import authRestrictionContentDefinition from "../../../auth/content/content-definition/auth-restriction-content-definition";
import AuthRestriction from "../../../auth/content/content-definition/types/auth-restriction";
import RoleAssignment from "../../../auth/content/content-definition/types/role";
import login from "../../../auth/domain/usecase/login";
import restrictionCache from "../../../auth/service/restriction-cache";

describe("authorization guard", () => {
    beforeEach(async () => {
        await contentDefinitionManager.createContentFieldDefinition(new TextContentFieldDefinition("", "id"));
        await thuyaApp.initialize();
        await thuyaApp.useModule(authModule);
    });
    
    afterEach(() => {
        restrictionCache.clear();
        localPersistency.clear();
    });


    it("should be successful unauthenticated without restriction", async () => {
        const guardUrlResult = await guardUrl.execute("", "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful()).to.be.true;
    });
    
    it("should be successful authenticated without restriction", async () => {
        const token = await registerUser();
        const guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful()).to.be.true;
    });
    
    it("should be successful authenticated with restriction and proper roles", async () => {
        await registerUser();
        await createRestriction();
        await createRoleAssignment();
        const token = await loginUser();

        const guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful(), guardUrlResult.getMessage()).to.be.true;
    });
    
    it("should be successful authenticated with restrictions and proper roles", async () => {
        await registerUser();
        await createRestrictions();
        await createRoleAssignments();
        const token = await loginUser();

        const guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful()).to.be.true;
    });

    it("should be successful authenticated with restrictions and a missing role", async () => {
        await registerUser();
        await createRestrictions();
        await createRoleAssignment();
        const token = await loginUser();

        const guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsFailing()).to.be.true;
        expect(guardUrlResult.getMessage()).to.equal("Not authorized to access url.");
    });
    
    it("should be successful authenticated with restriction and proper roles from cache", async () => {
        await registerUser();
        await createRestriction();
        await createRoleAssignment();
        const token = await loginUser();

        let guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful()).to.be.true;

        guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsSuccessful()).to.be.true;
    });
    
    it("should fail unauthenticated with restriction", async () => {
        await createRestriction();

        const guardUrlResult = await guardUrl.execute("", "test-content", "POST");
        expect(guardUrlResult.getIsFailing()).to.be.true;
        expect(guardUrlResult.getMessage()).to.equal("Token is empty.");
    });
    
    it("should fail authenticated with restriction and missing role", async () => {
        const token = await registerUser();
        await createRestriction();

        const guardUrlResult = await guardUrl.execute(token, "test-content", "POST");
        expect(guardUrlResult.getIsFailing()).to.be.true;
        expect(guardUrlResult.getMessage()).to.equal("Not authorized to access url.");
    });
})

/**
 * Login with test user.
 * 
 * @returns the JWT token
 */
async function loginUser(): Promise<string> {
    const loginResult = await login.execute("test@test.com", "Password123!");
    expect(loginResult.getIsSuccessful()).to.be.true;
    
    return loginResult.getResult()!.token;
}

/**
 * Create role assignment for the admin role and test user.
 */
async function createRoleAssignment(): Promise<void> {
    const role: RoleAssignment = {
        email: "test@test.com",
        roles: ["admin"]
    };
    const createRoleResult = await contentManager.createContent(roleAssignmentContentDefinition.getName(), role);
    expect(createRoleResult.getIsSuccessful()).to.be.true;
}

/**
 * Create a restriction for test content.
 */
async function createRestriction(): Promise<void> {
    const authRestriction: AuthRestriction = {
        contentDefinitionName: "test-content",
        operations: ["POST"],
        authorizedRoles: ["admin"]
    };
    const createRestrictionResult = await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    expect(createRestrictionResult.getIsSuccessful()).to.be.true;
}

/**
 * Create restrictions for test content.
 */
async function createRestrictions(): Promise<void> {
    let authRestriction: AuthRestriction = {
        contentDefinitionName: "test-content",
        operations: ["POST"],
        authorizedRoles: ["admin", "admin-2"]
    };
    let createRestrictionResult = await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    expect(createRestrictionResult.getIsSuccessful()).to.be.true;
    
    authRestriction = {
        contentDefinitionName: "test-content",
        operations: ["POST"],
        authorizedRoles: ["admin-3"]
    };
    createRestrictionResult = await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    expect(createRestrictionResult.getIsSuccessful()).to.be.true;
}

/**
 * Create role assignments for the admin role and test user.
 */
async function createRoleAssignments(): Promise<void> {
    const role: RoleAssignment = {
        email: "test@test.com",
        roles: ["admin", "admin-3"]
    };
    const createRoleResult = await contentManager.createContent(roleAssignmentContentDefinition.getName(), role);
    expect(createRoleResult.getIsSuccessful()).to.be.true;
}

/**
 * Register test user.
 * 
 * @returns 
 */
async function registerUser(): Promise<string> {
    const registerResult = await register.execute("test@test.com", "Password123!");
    expect(registerResult.getIsSuccessful()).to.be.true;
    
    return registerResult.getResult()!.token;
}
