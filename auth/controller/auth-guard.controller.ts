import { IController, logger } from "@thuya/framework";
import { NextFunction, Request, Response, Router } from "express";
import guardUrl from "../domain/usecase/guard-url";

class AuthGuardController implements IController {
    private router: Router;



    constructor() {
        this.router = Router();

        this.router.use(this.guardURL);
    }
    
    
    
    getRouter(): Router {
        return this.router;
    }


    private guardURL(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.headers.authorization) {
                logger.debug("Not authorized to access url. Authorization header is missing.");
                throw new Error("Not authorized to access url.")
            }
            
            const token = request.headers.authorization.split(" ")[1];
            guardUrl.execute(token);
        
            next();
        }
    
        catch(error: any) {
            response
                .sendStatus(401);
        }
    }
}

export default new AuthGuardController();