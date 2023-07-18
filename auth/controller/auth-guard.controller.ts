import { IController, expressHelper } from "@thuya/framework";
import { NextFunction, Request, Response, Router } from "express";
import guardUrl from "../domain/usecase/guard-url";

/**
 * Controller to guard URLs based on authorization restrictions.
 */
class AuthGuardController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.use(this.guardURL);
    }
    
    
    
    /**
     * @inheritdoc
     */
    getRouter(): Router {
        return this.router;
    }


    private async guardURL(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const token = request.headers.authorization ? request.headers.authorization.split(" ")[1] : "";    
            await guardUrl.execute(token, expressHelper.getContentDefinitionName(request), request.method);
            
            next();
        }
    
        catch (error: any) {
            response.sendStatus(401);
        }
    }
}

export default new AuthGuardController();