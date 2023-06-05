import jwt, { JwtPayload } from 'jsonwebtoken';
import IJwtService, { UserJwtPayload } from "../domain/usecase/jwt.interface";
import { Logger } from '@thuya/framework';

class JwtService implements IJwtService {
    private hashString = "cc27fed5-6368-44fc-97ac-bff0425d98f0";
    private expiresInSeconds = 3600;
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(JwtService.name);
    }



    getExpiresInSeconds(): number {
        return this.expiresInSeconds;
    }

    createToken(user: { email: string, roles: string[] }): string {
        const payload: UserJwtPayload = {
            email: user.email,
            roles: user.roles
        };

        return jwt.sign(payload, this.hashString, {
            expiresIn: this.expiresInSeconds
        });
    }

    verifyToken(token: string): UserJwtPayload {
        if (!token) {
            this.logger.debug("Token is empty.");
            throw new Error("Token is empty.");
        }

        const payload = jwt.verify(token, this.hashString) as JwtPayload;
    
        return {
            email: payload["email"],
            roles: payload["roles"]
        };
    }
}

export default new JwtService();