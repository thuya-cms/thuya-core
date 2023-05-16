import { IController } from "@thuya/framework";
import Email from "../domain/value-object/email";
import { Request, Response, Router } from "express";
import register from "../domain/usecase/register";

class RegisterController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.post("/register", this.register);
    }
    
    
    
    getRouter(): Router {
        return this.router;
    }


    private async register(request: Request, response: Response) {
        try {
            const token = await register.execute(request.body.email, request.body.password);

            response.json({
                token: token
            }).status(200);
        }

        catch (error: any) {
            response.sendStatus(401);
        }
    }
}

export default new RegisterController();