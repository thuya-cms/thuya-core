import { TextContentFieldDefinition, contentDefinitionManager, contentManager, thuyaApp } from "@thuya/framework";
import { authModule } from "../../../auth";
import { should } from "chai";
import register from "../../../auth/domain/usecase/register";
import { afterEach, beforeEach } from "mocha";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";

describe("register tests", () => {
    beforeEach(async () => {
        await contentDefinitionManager.createContentFieldDefinition(new TextContentFieldDefinition("", "id"));
        await thuyaApp.initialize();
        await thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful with valid data", async () => {
        await register.execute("test@test.com", "goodPassword123!");
        const userResult = await contentManager.readContentByFieldValue("user", { name: "email", value: "test@test.com" });
        should().equal(userResult.getIsSuccessful(), true, userResult.getMessage());
        should().exist(userResult.getResult().password);
        should().not.equal(userResult.getResult().password, "goodPassword123!");
    });

    it("should fail with invalid password", async () => {
        try {
            await register.execute("test@test.com", "short");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Password format is invalid.");
        }
    });
    
    it("should fail with empty password", async () => {
        try {
            await register.execute("test@test.com", "");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Value for field password is required.");
        }
    });

    it("should fail with invalid email", async () => {
        try {
            await register.execute("test.com", "Password123!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Email address is invalid.");
        }
    });
    
    it("should fail with empty email", async () => {
        try {
            await register.execute("", "Password123!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Value for field email is required.");
        }
    });
    
    it("should fail with existing email", async () => {
        const token = await register.execute("test@test.com", "Password123!");
        should().exist(token);

        try {
            await register.execute("test@test.com", "Password456!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, `Value "test@test.com" of field email is not unique.`);
        }
    });
});