import express from 'express';
import { ContentProvider, IController, Module } from '@thuya/framework';
import authContentProvider from './content/auth-content-provider';
import expressAuthHandler from './app/express-auth-handler';
import { authGuardController } from './controller';

class AuthModule extends Module {
    setupMiddlewares(expressApp: express.Application): void {
        expressApp.post("/login", expressAuthHandler.login);
        expressApp.post("/register", expressAuthHandler.register);
    }
    
    getContentProviders(): ContentProvider[] {
        return [authContentProvider];
    }

    getControllers(): IController[] {
        return [authGuardController];
    }
}

export default new AuthModule();