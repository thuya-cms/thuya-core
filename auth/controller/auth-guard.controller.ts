import { IController, contentManager, expressHelper, logger } from "@thuya/framework";
import { NextFunction, Request, Response, Router } from "express";
import guardUrl from "../domain/usecase/guard-url";
import authRestrictionContentDefinition from "../content/auth-restriction-content-definition";
import AuthRestriction from "../content/auth-restriction";
import roleContentDefinition from "../content/role-content-definition";

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
            const token = request.headers.authorization ? request.headers.authorization.split(" ")[1] : "";    
            guardUrl.execute(token, expressHelper.getContentName(request), request.method);
            
            next();
        }
    
        catch(error: any) {
            response.sendStatus(401);
        }
    }
}

export default new AuthGuardController();