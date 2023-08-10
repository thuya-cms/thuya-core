import { Result } from "@thuya/framework";

/**
 * Entity class for emails.
 */
class Email {
    /**
     * Email value object.
     * 
     * @param email email address
     * @throws will throw an error if the email format is not valid
     */
    private constructor(private email: string) {
        if (!this.isEmailValid(email))
            throw new Error("Email address is invalid.");
    }



    /**
     * Create a new email.
     * 
     * @param email email address
     * @returns result containing the new email instance
     */
    static create(email: string): Result<Email> {
        try {
            return Result.success(new Email(email));
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }


    /**
     * @returns the email address
     */
    value(): string {
        return this.email;
    }

    /**
     * Checks if this email objects equals to another. 
     * 
     * @param email the other email object
     * @returns true if the value of the objects match
     */
    equals(email: Email): boolean {
        return email.value() === this.email;
    }


    private isEmailValid(email: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        
        return regex.test(email);
    }
}

export default Email;