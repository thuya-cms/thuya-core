import jwt from 'jsonwebtoken';
import User from "../content/user";
import IJwtService from "../domain/usecase/jwt.interface";

class JwtService implements IJwtService {
    private hashString: string = "cc27fed5-6368-44fc-97ac-bff0425d98f0";



    createToken(user: User): string {
        const payload = {
            email: user.email
        };

        return jwt.sign(payload, this.hashString);
    }
}

export default new JwtService();