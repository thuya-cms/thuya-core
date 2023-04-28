import User from "../../content/user";

type UserJwtPayload = {
    email: string
};

interface IJwtService {
    createToken(user: User): string;
    verifyToken(token: string): UserJwtPayload;
}

export default IJwtService;
export { UserJwtPayload };