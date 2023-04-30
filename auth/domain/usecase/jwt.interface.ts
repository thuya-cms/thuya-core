import User from "../../content/user";

type UserJwtPayload = {
    email: string,
    roles: string[]
};

interface IJwtService {
    createToken(user: { email: string, roles: string[] }): string;
    verifyToken(token: string): UserJwtPayload;
}

export default IJwtService;
export { UserJwtPayload };