import express from 'express';
import { ContentProvider, Module } from '@thuya/framework';
import authContentProvider from './content/auth-content-provider';
import expressAuthHandler from './app/express-auth-handler';

class AuthModule extends Module {
    setupMiddlewares(expressApp: express.Application): void {
        expressApp.post("/login", expressAuthHandler.login);
        expressApp.post("/register", expressAuthHandler.register);
    }
    
    getContentProviders(): ContentProvider[] {
        return [authContentProvider];
    }
}

export default new AuthModule();