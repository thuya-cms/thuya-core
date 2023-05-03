import { thuyaApp } from "@thuya/framework";
import { authModule } from "../../auth";
import Email from "../../auth/domain/value-object/email";
import { should } from "chai";
import register from "../../auth/domain/usecase/register";
import { afterEach, beforeEach } from "mocha";
import localPersistency from "@thuya/framework/dist/content-management/persistency/local-content-management-persistency";

describe("register tests", () => {
    beforeEach(() => {
        thuyaApp.useModule(authModule);
    });

    afterEach(() => {
        localPersistency.clear();
    });


    it("should fail with invalid password", () => {
        try {
            register.execute(new Email("test@test.com"), "short");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Password format is invalid.");
        }
    });

    it("should fail with invalid email", () => {
        try {
            register.execute(new Email("test.com"), "Password123!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Email address is invalid.");
        }
    });
    
    it("should fail with existing email", () => {
        const token = register.execute(new Email("test@test.com"), "Password123!");
        should().exist(token);

        try {
            register.execute(new Email("test@test.com"), "Password456!");
            should().fail();
        }
        
        catch (error: any) {
            should().equal(error.message, "Value of field email is not unique.");
        }
    });
});