import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../content/user";
import IJwtService, { UserJwtPayload } from "../domain/usecase/jwt.interface";

class JwtService implements IJwtService {
    private hashString: string = "cc27fed5-6368-44fc-97ac-bff0425d98f0";



    createToken(user: User): string {
        const payload: UserJwtPayload = {
            email: user.email
        };

        return jwt.sign(payload, this.hashString);
    }

    verifyToken(token: string): UserJwtPayload {
        const payload = jwt.verify(token, this.hashString) as JwtPayload;
    
        return {
            email: payload["email"]
        };
    }
}

export default new JwtService();