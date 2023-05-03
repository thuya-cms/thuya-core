import IdentifiableError from "@thuya/framework/dist/identitfiable-error";

enum ErrorCode {
    Invalid = "invalid"
}

class Email {
    /**
     * Email value object.
     * 
     * @param email the email
     * @throws will throw an error if the email format is not valid
     */
    constructor(private email: string) {
        if (!this.isEmailValid(email))
            throw new IdentifiableError(ErrorCode.Invalid, "Email address is invalid.");
    }



    value(): string {
        return this.email;
    }

    equals(email: Email): boolean {
        return email.value() === this.email;
    }


    private isEmailValid(email: string) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        return regex.test(email);
    }
}

export default Email;
export { ErrorCode };