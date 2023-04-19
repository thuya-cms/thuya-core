import bcrypt from 'bcrypt';
import IdentifiableError from '@thuya/framework/dist/identitfiable-error';

enum ErrorCode {
    Invalid = "invalid"
}

class Password {
    private hashedPassword: string;



    /**
     * Password value object storing it in hashed format.
     * 
     * @param password the password in hashed or not hashed format
     * @param isHashed true if the password is already hashed
     * @throws will throw an error when the password format is not correct
     */
    constructor(password: string, isHashed: boolean = false) {
        if (!isHashed && !this.isPasswordValid(password))
            throw new IdentifiableError(ErrorCode.Invalid, "Password format is invalid.");

        if (isHashed)
            this.hashedPassword = password;
        else
            this.hashedPassword = bcrypt.hashSync(password, 8);
    }

 

    static empty(): Password {
        return new Password("", true);
    }


    value(): string {
        return this.hashedPassword;
    }

    compare(password: string): boolean {
        return bcrypt.compareSync(password, this.hashedPassword);
    }

    isEmpty(): boolean {
        return this.hashedPassword.trim() === "";
    }


    private isPasswordValid(password: string): boolean {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

        return regex.test(password);
    }
}

export default Password;