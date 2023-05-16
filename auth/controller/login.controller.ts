import { IController } from "@thuya/framework";
import Email from "../domain/value-object/email";
import login from "../domain/usecase/login";
import { Request, Response, Router } from "express";

class LoginController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.post("/login", this.login);
    }
    
    
    
    getRouter(): Router {
        return this.router;
    }


    private async login(request: Request, response: Response) {
        try {
            const token = await login.execute(request.body.email, request.body.password);
    
            response.json({
                token: token
            }).status(200);
        }
    
        catch (error: any) {
            response.sendStatus(401);
        }
    }
}

export default new LoginController();