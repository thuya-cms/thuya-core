import { TextContentFieldDefinition, contentDefinitionManager, thuyaApp } from "@thuya/framework";
import { authModule } from "../../../auth";
import login from "../../../auth/domain/usecase/login";
import { should } from "chai";
import register from "../../../auth/domain/usecase/register";
import { afterEach, beforeEach } from "mocha";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";

describe("login tests", () => {
    beforeEach(async () => {
        await contentDefinitionManager.createContentFieldDefinition(new TextContentFieldDefinition("", "id"));
        await thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful with valid credentials", async () => {
        let token = await register.execute("test@test.com", "password123!")
        should().exist(token);
        
        token = await login.execute("test@test.com", "password123!");
        should().exist(token);
    });

    it("should fail with invalid password", async () => {
        const token = await register.execute("test@test.com", "password123!")
        should().exist(token);
        
        try {
            await login.execute("test@test.com", "password1234!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Invalid login attempt.");
        }
    });
    
    it("should fail with empty password", async () => {
        const token = await register.execute("test@test.com", "password123!")
        should().exist(token);
        
        try {
            await login.execute("test@test.com", "");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Invalid login attempt.");
        }
    });

    it("should fail with invalid email", async () => {
        const token = await register.execute("test@test.com", "password123!")
        should().exist(token);
        
        try {
            await login.execute("test1@test.com", "password123!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Invalid login attempt.");
        }
    });
    
    it("should fail with empty email", async () => {
        const token = await register.execute("test@test.com", "password123!")
        should().exist(token);
        
        try {
            await login.execute("", "password123!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Invalid login attempt.");
        }
    });
});