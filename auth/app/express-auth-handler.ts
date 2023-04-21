import { NextFunction, Request, Response } from "express";
import login from "../domain/usecase/login";
import Email from "../domain/value-object/email";
import Password from "../domain/value-object/password";

class ExpressAuthHandler {
    login(request: Request, response: Response, next: NextFunction) {
        try {
            let email = new Email(request.body.email);
            let password = new Password(request.body.password);

            let token = login.execute(email, password);

            response.json({
                token: token
            }).status(200);
        }

        catch (error: any) {
            response.sendStatus(401);
        }
    }
}

export default new ExpressAuthHandler();