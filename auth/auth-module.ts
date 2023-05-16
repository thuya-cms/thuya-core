import { ContentProvider, IController, Module } from '@thuya/framework';
import authContentProvider from './content/auth-content-provider';
import { authGuardController } from './controller';
import loginController from './controller/login.controller';
import registerController from './controller/register.controller';

class AuthModule extends Module {
    override getMetadata(): { name: string; } {
        return {
            name: "auth-module"
        };
    }
    
    override getContentProviders(): ContentProvider[] {
        return [authContentProvider];
    }

    override getControllers(): IController[] {
        return [
            authGuardController,
            loginController,
            registerController
        ];
    }
}

export default new AuthModule();