import { IController } from "@thuya/framework";
import login from "../domain/usecase/login";
import { Request, Response, Router } from "express";

/**
 * Controller to login users.
 */
class LoginController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.post("/login", this.login);
    }
    
    
    
    /**
     * @inheritdoc
     */
    getRouter(): Router {
        return this.router;
    }


    private async login(request: Request, response: Response): Promise<void> {
        try {
            const loginData = await login.execute(request.body.email, request.body.password);
    
            response.json(loginData).status(200);
        }
    
        catch (error: any) {
            response.status(401).send();
        }
    }
}

export default new LoginController();