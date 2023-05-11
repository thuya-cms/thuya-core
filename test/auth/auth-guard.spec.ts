import { TextContentFieldDefinition, contentDefinitionManager, contentManager, thuyaApp } from "@thuya/framework";
import { authModule, roleContentDefinition } from "../../auth";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";
import guardUrl from "../../auth/domain/usecase/guard-url";
import register from "../../auth/domain/usecase/register";
import Email from "../../auth/domain/value-object/email";
import { should } from "chai";
import authRestrictionContentDefinition from "../../auth/content/auth-restriction-content-definition";
import AuthRestriction from "../../auth/content/auth-restriction";
import Role from "../../auth/content/role";
import login from "../../auth/domain/usecase/login";

describe("authorization guard", () => {
    beforeEach(async () => {
        await contentDefinitionManager.createContentFieldDefinition(new TextContentFieldDefinition("", "id"));
        await thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful unauthenticated without restriction", async () => {
        await guardUrl.execute("", "test-content", "POST");
    });
    
    it("should be successful authenticated without restriction", async () => {
        const token = await registerUser();
        await guardUrl.execute(token, "test-content", "POST");
    });
    
    it("should be successful authenticated with restriction and proper roles", async () => {
        await registerUser();
        await createRestriction();
        await createRole();

        const token = await loginUser();
        await guardUrl.execute(token, "test-content", "POST");
    });
    
    it("should fail unauthenticated with restriction", async () => {
        await createRestriction();

        try {
            await guardUrl.execute("", "test-content", "POST");
            should().fail();
        }

        catch (error: any) {
            should().equal(error.message, "Token is empty.");
        }
    });
    
    it("should fail authenticated with restriction and missing role", async () => {
        const token = await registerUser();
        await createRestriction();

        try {
            await guardUrl.execute(token, "test-content", "POST");
            should().fail();
        }

        catch (error: any) {
            should().equal(error.message, "Not authorized to access url.");
        }
    });
})

async function loginUser(): Promise<string> {
    const token = await login.execute(new Email("test@test.com"), "Password123!");
    should().exist(token);
    
    return token;
}

async function createRole() {
    const role: Role = {
        email: "test@test.com",
        roles: ["admin"]
    };
    const createRoleResult = await contentManager.createContent(roleContentDefinition.getName(), role);
    should().equal(createRoleResult.getIsSuccessful(), true, createRoleResult.getMessage());
}

async function createRestriction() {
    const authRestriction: AuthRestriction = {
        contentDefinitionName: "test-content",
        operations: ["POST"],
        roles: ["admin"]
    };
    const createRestrictionResult = await contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    should().equal(createRestrictionResult.getIsSuccessful(), true, createRestrictionResult.getMessage());
}

async function registerUser(): Promise<string> {
    const token = await register.execute(new Email("test@test.com"), "Password123!");
    should().exist(token);
    
    return token;
}
