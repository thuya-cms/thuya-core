import jwtService from "../service/jwt.service";
import IJwtService from "./usecase/jwt.interface";

class Factory {
    private jwtService!: IJwtService;



    constructor() {
        this.jwtService = jwtService;
    }

    

    getJwtService(): IJwtService {
        return this.jwtService;
    }
}

export default new Factory();