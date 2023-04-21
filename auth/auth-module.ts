import express from 'express';
import ContentProvider from '@thuya/framework/dist/content-provider';
import Module from '@thuya/framework/dist/module';
import authContentProvider from './content/auth-content-provider';
import expressAuthHandler from './app/express-auth-handler';

class AuthModule extends Module {
    setupMiddlewares(expressApp: express.Application): void {
        expressApp.post("/login", expressAuthHandler.login);
    }
    
    getContentProviders(): ContentProvider[] {
        return [authContentProvider];
    }
}

export default new AuthModule();