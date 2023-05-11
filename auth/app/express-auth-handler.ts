import { Request, Response } from "express";
import { logger } from "@thuya/framework";
import login from "../domain/usecase/login";
import Email from "../domain/value-object/email";
import register from "../domain/usecase/register";

class ExpressAuthHandler {
    async login(request: Request, response: Response) {
        try {
            const email = new Email(request.body.email);
            const token = await login.execute(email, request.body.password);

            response.json({
                token: token
            }).status(200);
        }

        catch (error: any) {
            logger.error(error.message);
            response.sendStatus(401);
        }
    }

    async register(request: Request, response: Response) {
        try {
            const email = new Email(request.body.email);
            const token = await register.execute(email, request.body.password);

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