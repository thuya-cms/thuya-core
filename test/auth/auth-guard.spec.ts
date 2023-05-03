import { contentManager, thuyaApp } from "@thuya/framework";
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
    beforeEach(() => {
        thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful unauthenticated without restriction", () => {
        guardUrl.execute("", "test-content", "POST");
    });
    
    it("should be successful authenticated without restriction", () => {
        const token = registerUser();
        guardUrl.execute(token, "test-content", "POST");
    });
    
    it("should be successful authenticated with restriction and proper roles", () => {
        registerUser();
        createRestriction();
        createRole();

        const token = loginUser();
        guardUrl.execute(token, "test-content", "POST");
    });
    
    it("should fail unauthenticated with restriction", () => {
        createRestriction();

        try {
            guardUrl.execute("", "test-content", "POST");
            should().fail();
        }

        catch (error: any) {
            should().equal(error.message, "jwt must be provided");
        }
    });
    
    it("should fail authenticated with restriction and missing role", () => {
        const token = registerUser();
        createRestriction();

        try {
            guardUrl.execute(token, "test-content", "POST");
            should().fail();
        }

        catch (error: any) {
            should().equal(error.message, "Not authorized to access url.");
        }
    });
})

function loginUser(): string {
    const token = login.execute(new Email("test@test.com"), "Password123!");
    should().exist(token);
    
    return token;
}

function createRole() {
    const role: Role = {
        email: "test@test.com",
        roles: ["admin"]
    };
    const createRoleResult = contentManager.createContent(roleContentDefinition.getName(), role);
    should().equal(createRoleResult.getIsSuccessful(), true, createRoleResult.getMessage());
}

function createRestriction() {
    const authRestriction: AuthRestriction = {
        contentDefinitionName: "test-content",
        operations: ["POST"],
        roles: ["admin"]
    };
    const createRestrictionResult = contentManager.createContent(authRestrictionContentDefinition.getName(), authRestriction);
    should().equal(createRestrictionResult.getIsSuccessful(), true, createRestrictionResult.getMessage());
}

function registerUser(): string {
    const token = register.execute(new Email("test@test.com"), "Password123!");
    should().exist(token);
    
    return token;
}
