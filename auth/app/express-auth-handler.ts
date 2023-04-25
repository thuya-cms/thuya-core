import { NextFunction, Request, Response } from "express";
import { logger } from "@thuya/framework";
import login from "../domain/usecase/login";
import Email from "../domain/value-object/email";
import register from "../domain/usecase/register";

class ExpressAuthHandler {
    login(request: Request, response: Response, next: NextFunction) {
        try {
            let email = new Email(request.body.email);
            let token = login.execute(email, request.body.password);

            response.json({
                token: token
            }).status(200);
        }

        catch (error: any) {
            logger.error(error.message);
            response.sendStatus(401);
        }
    }

    register(request: Request, response: Response, next: NextFunction) {
        try {
            let email = new Email(request.body.email);
            let token = register.execute(email, request.body.password);

            response.json({
                token: token
            }).status(200);
        }

        catch (error: any) {
            logger.error(error.message);
            response.sendStatus(401);
        }
    }
}

export default new ExpressAuthHandler();