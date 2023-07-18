import { IController } from "@thuya/framework";
import { Request, Response, Router } from "express";
import register from "../domain/usecase/register";

/**
 * Controller to register users.
 */
class RegisterController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.post("/register", this.register);
    }
    
    
    
    /**
     * @inheritdoc
     */
    getRouter(): Router {
        return this.router;
    }


    private async register(request: Request, response: Response): Promise<void> {
        try {
            const registerData = await register.execute(request.body.email, request.body.password);

            response.json(registerData).status(200);
        }

        catch (error: any) {
            response.status(401).send();
        }
    }
}

export default new RegisterController();