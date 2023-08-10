import jwt, { JwtPayload } from 'jsonwebtoken';
import IJwtService, { UserJwtPayload } from "../domain/usecase/jwt.interface";
import { Logger } from '@thuya/framework';

/**
 * Service handling JWT requests.
 */
class JwtService implements IJwtService {
    private hashString;
    private expiresInSeconds = 3600;
    private logger: Logger;



    constructor() {
        this.logger = Logger.for(JwtService.name);

        if (process.env.AUTH_TOKEN_HASH_STRING) {
            this.hashString = process.env.AUTH_TOKEN_HASH_STRING;
        } else {
            this.logger.info("Using dummy token. It should not be used in production.");
            this.hashString = "dummy-hash-token";
        }
    }



    /**
     * @inheritdoc
     */
    getExpiresInSeconds(): number {
        return this.expiresInSeconds;
    }

    /**
     * @inheritdoc
     */
    createToken(user: { email: string, roles: string[] }): string {
        const payload: UserJwtPayload = {
            email: user.email,
            roles: user.roles
        };

        return jwt.sign(payload, this.hashString, {
            expiresIn: this.expiresInSeconds
        });
    }

    /**
     * @inheritdoc
     */
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