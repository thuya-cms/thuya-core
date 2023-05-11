import jwt, { JwtPayload } from 'jsonwebtoken';
import IJwtService, { UserJwtPayload } from "../domain/usecase/jwt.interface";
import { logger } from '@thuya/framework';

class JwtService implements IJwtService {
    private hashString = "cc27fed5-6368-44fc-97ac-bff0425d98f0";



    createToken(user: { email: string, roles: string[] }): string {
        const payload: UserJwtPayload = {
            email: user.email,
            roles: user.roles
        };

        return jwt.sign(payload, this.hashString);
    }

    verifyToken(token: string): UserJwtPayload {
        if (!token) {
            logger.debug("Token is empty.");
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