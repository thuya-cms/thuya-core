import { thuyaApp } from "@thuya/framework";
import { authModule } from "../../auth";
import login from "../../auth/domain/usecase/login";
import Email from "../../auth/domain/value-object/email";
import { should } from "chai";
import register from "../../auth/domain/usecase/register";
import { afterEach, beforeEach } from "mocha";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";

describe("login tests", () => {
    beforeEach(() => {
        thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should be successful with valid credentials", () => {
        let token = register.execute(new Email("test@test.com"), "password123!")
        should().exist(token);
        
        token = login.execute(new Email("test@test.com"), "password123!");
        should().exist(token);
    });

    it("should fail with invalid password", () => {
        let token = register.execute(new Email("test@test.com"), "password123!")
        should().exist(token);
        
        try {
            login.execute(new Email("test@test.com"), "password1234!");
        }
        
        catch (error: any) {
            should().equal(error.message, "Unknown error during login.");
        }
    });

    it("should fail with invalid email", () => {
        let token = register.execute(new Email("test@test.com"), "password123!")
        should().exist(token);
        
        try {
            login.execute(new Email("test1@test.com"), "password123!");
        }
        
        catch (error: any) {
            should().equal(error.message, "Unknown error during login.");
        }
    });
});