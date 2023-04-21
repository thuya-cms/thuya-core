import User from "../../content/user";

interface IJwtService {
    createToken(user: User): string;
}

export default IJwtService;