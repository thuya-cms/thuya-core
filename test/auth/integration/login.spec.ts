import { TextContentFieldDefinition, contentDefinitionManager, thuyaApp } from "@thuya/framework";
import { authModule } from "../../../auth";
import login from "../../../auth/domain/usecase/login";
import { expect, should } from "chai";
import register from "../../../auth/domain/usecase/register";
import { afterEach, beforeEach } from "mocha";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";

describe("login tests", () => {
    beforeEach(async () => {
        await contentDefinitionManager.createContentFieldDefinition(new TextContentFieldDefinition("", "id"));
        await thuyaApp.initialize();
        await thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful with valid credentials", async () => {
        const registerResult = await register.execute("test@test.com", "password123!")
        expect(registerResult.getIsSuccessful()).to.be.true;
        
        const loginResult = await login.execute("test@test.com", "password123!");
        expect(loginResult.getIsSuccessful()).to.be.true;
        expect(loginResult.getResult()).to.exist;
    });

    it("should fail with invalid password", async () => {
        const registerResult = await register.execute("test@test.com", "password123!")
        expect(registerResult.getIsSuccessful()).to.be.true;
        
        const loginResult = await login.execute("test@test.com", "password1234!");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });
    
    it("should fail with empty password", async () => {
        const registerResult = await register.execute("test@test.com", "password123!")
        expect(registerResult.getIsSuccessful()).to.be.true;
        
        const loginResult = await login.execute("test@test.com", "");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });

    it("should fail with invalid email", async () => {
        const registerResult = await register.execute("test@test.com", "password123!")
        expect(registerResult.getIsSuccessful()).to.be.true;
        
        const loginResult = await login.execute("test1@test.com", "password123!");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });
    
    it("should fail with empty email", async () => {
        const registerResult = await register.execute("test@test.com", "password123!")
        expect(registerResult.getIsSuccessful()).to.be.true;
        
        const loginResult = await login.execute("", "password123!");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });
});