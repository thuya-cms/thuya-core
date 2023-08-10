import { expect } from "chai";
import login from "../../../../../auth/domain/usecase/login";
import { contentManager, Result } from "@thuya/framework";
import sinon from "sinon";
import Password from "../../../../../auth/domain/value-object/password";
import { afterEach, before } from "mocha";
import factory from "../../../../../auth/domain/factory";
import sinonChai from "sinon-chai";
import chai from "chai";
import userContentDefinition from "../../../../../auth/content/content-definition/user-content-definition";
import roleAssignmentContentDefinition from "../../../../../auth/content/content-definition/role-assignment-content-definition";

describe("login unit tests", () => {
    before(() => {
        chai.use(sinonChai);
    });
    
    afterEach(() => {
        sinon.restore();
    });


    it("should fail with not existing user", async () => {
        sinon.stub(contentManager, "readContentByFieldValue").returns(Promise.resolve(Result.error("Not existing email")));
        
        const loginResult = await login.execute("dummy@dummy.com", "DummyPass1234!");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });
    
    it("should fail with invalid password", async () => {
        sinon
            .stub(contentManager, "readContentByFieldValue")
            .returns(Promise.resolve(Result.success({
                password: Password.create("OtherPass1234!").getResult()!.value()
            })));

        const loginResult = await login.execute("dummy@dummy.com", "DummyPass1234!");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });
    
    it("should fail with empty password", async () => {
        sinon
            .stub(contentManager, "readContentByFieldValue")
            .returns(Promise.resolve(Result.success({
                password: Password.create("OtherPass1234!").getResult()!.value()
            })));

        const loginResult = await login.execute("dummy@dummy.com", "");
        expect(loginResult.getIsFailing()).to.be.true;
        expect(loginResult.getMessage()).to.equal("Invalid login attempt.");
    });

    it("should be successful with valid credentials", async () => {
        sinon
            .stub(contentManager, "readContentByFieldValue")
            .withArgs(userContentDefinition.getName())
            .returns(Promise.resolve(Result.success({
                password: Password.create("DummyPass1234!").getResult()!.value()
            })))
            
            .withArgs(roleAssignmentContentDefinition.getName())
            .returns(Promise.resolve(Result.error()));

        const createTokenStub = sinon.stub(factory.getJwtService(), "createToken").returns("token1");
    
        const loginResult = await login.execute("dummy@dummy.com", "DummyPass1234!");
        expect(loginResult.getIsSuccessful()).to.be.true;    
        expect(loginResult.getResult()!.token).to.equal("token1");
        expect(createTokenStub).to.have.been.calledWith({
            email: "dummy@dummy.com",
            roles: []
        });
    });
    
    it("should be successful with valid credentials and roles", async () => {
        sinon
            .stub(contentManager, "readContentByFieldValue")
            .withArgs(userContentDefinition.getName())
            .returns(Promise.resolve(Result.success({
                password: Password.create("DummyPass1234!").getResult()!.value()
            })))

            .withArgs(roleAssignmentContentDefinition.getName())
            .returns(Promise.resolve(Result.success({
                roles: ["admin"]
            })));

        const createTokenStub = sinon.stub(factory.getJwtService(), "createToken").returns("token1");
    
        const loginResult = await login.execute("dummy@dummy.com", "DummyPass1234!");
        expect(loginResult.getIsSuccessful()).to.be.true;
        expect(loginResult.getResult()!.token).to.equal("token1");
        expect(createTokenStub).to.have.been.calledWith({
            email: "dummy@dummy.com",
            roles: ["admin"]
        });
    });
});