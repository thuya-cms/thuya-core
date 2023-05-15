import User from "../../content/content-definition/types/user";

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