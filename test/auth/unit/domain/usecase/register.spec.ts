import { expect } from "chai";
import register from "../../../../../auth/domain/usecase/register";
import sinon from "sinon";
import { Result, contentManager } from "@thuya/framework";
import sinonChai from "sinon-chai";
import chai from "chai";
import factory from "../../../../../auth/domain/factory";

describe("register unit tests", () => {
    before(() => {
        chai.use(sinonChai);
    });
    
    afterEach(() => {
        sinon.restore();
    });

    
    it("should fail if create user fails", async () => {
        sinon.stub(contentManager, "createContent").returns(Promise.resolve(Result.error("Failed to create")));

        const registerResult = await register.execute("dummy@dummy.com", "DummyPass1234!");
        expect(registerResult.getIsFailing()).to.be.true;
        expect(registerResult.getMessage()).to.equal("Failed to create");
    });
    
    it("should be successful if create is successful", async () => {
        sinon.stub(contentManager, "createContent").returns(Promise.resolve(Result.success()));
        const createTokenStub = sinon.stub(factory.getJwtService(), "createToken").returns("token1");

        const registerResult = await register.execute("dummy@dummy.com", "DummyPass1234!");
        expect(registerResult.getIsSuccessful()).to.be.true;
        expect(registerResult.getResult()!.token).to.equal("token1");
        expect(createTokenStub).to.be.calledWith({
            email: "dummy@dummy.com",
            roles: []
        });
    });
});