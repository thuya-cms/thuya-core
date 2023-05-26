type UserJwtPayload = {
    email: string,
    roles: string[]
};

interface IJwtService {
    getExpiresInSeconds(): number;
    createToken(user: { email: string, roles: string[] }): string;
    verifyToken(token: string): UserJwtPayload;
}

export default IJwtService;
export { UserJwtPayload };