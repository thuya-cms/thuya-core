import IdentifiableError from "../../../framework/identitfiable-error";
import Email from "../value-object/email";
import Password from "../value-object/password";

enum ErrorCode {
    EmptyRole = "empty-role",
    RoleAlreadyAssigned = "role-already-assigned"
}

interface IUser {
    getEmail(): Email;
    getPassword(): Password;
}

class User implements IUser {
    constructor(private email: Email, private password: Password, private roles: string[] = []) {}
    
    
    
    getEmail(): Email {
        return this.email;
    }

    getPassword(): Password {
        return this.password;
    }

    getRoles(): string[] {
        return this.roles;
    }

    /**
     * Add a new role to the usrer.
     * 
     * @param role the role to add
     * @throws will throw an error when the role is empty
     * @throws will throw an error when the role is already assigned
     */
    addRole(role: string) {
        if (!role)
            throw new IdentifiableError(ErrorCode.EmptyRole, "Unknown role.");

        if (this.roles.find(r => r === role))
            throw new IdentifiableError(ErrorCode.RoleAlreadyAssigned, `Role ${ role } is already added to this user.`);

        this.roles.push(role);
    }
}

export { IUser, User, ErrorCode };