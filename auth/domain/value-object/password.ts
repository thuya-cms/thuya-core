import { Result } from '@thuya/framework';
import bcrypt from 'bcrypt';

/**
 * Entity class for passwords.
 */
class Password {
    private hashedPassword: string;



    /**
     * Password value object storing it in hashed format.
     * 
     * @param password the password in hashed or not hashed format
     * @param isHashed true if the password is already hashed
     * @throws will throw an error when the password format is not correct
     */
    private constructor(password: string, isHashed = false) {
        if (!isHashed && !this.isPasswordValid(password))
            throw new Error("Password format is invalid.");

        if (isHashed)
            this.hashedPassword = password;
        else
            this.hashedPassword = bcrypt.hashSync(password, 8);
    }

 

    /**
     * Create a new password.
     * 
     * @param password the password in hashed or not hashed format
     * @param isHashed true if the password is already hashed
     * @returns result containing the new password instance
     */
    static create(password: string, isHashed = false): Result<Password> {
        try {
            return Result.success(new Password(password, isHashed));
        }

        catch (error: any) {
            return Result.error(error.message);
        }
    }

    /**
     * Create an empty password.
     * 
     * @returns an empty password entity
     */
    static empty(): Password {
        return new Password("", true);
    }


    /**
     * @returns the value of the password, hashed
     */
    value(): string {
        return this.hashedPassword;
    }

    /**
     * Compare this password object with a password string. 
     * 
     * @param password the password string to compare
     * @returns true if the passwords match
     */
    compare(password: string): boolean {
        return bcrypt.compareSync(password, this.hashedPassword);
    }

    /**
     * @returns true if the password is empty
     */
    isEmpty(): boolean {
        return this.hashedPassword.trim() === "";
    }


    private isPasswordValid(password: string): boolean {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

        return regex.test(password);
    }
}

export default Password;