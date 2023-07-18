import jwtService from "../service/jwt.service";
import IJwtService from "./usecase/jwt.interface";

/**
 * Factory for services.
 */
class Factory {
    private jwtService!: IJwtService;



    constructor() {
        this.jwtService = jwtService;
    }

    

    /**
     * @returns the JWT service instance
     */
    getJwtService(): IJwtService {
        return this.jwtService;
    }
}

export default new Factory();