import { ContentProvider, IController, Module } from '@thuya/framework';
import authContentProvider from './content/auth-content-provider';
import { authGuardController } from './controller';
import loginController from './controller/login.controller';
import registerController from './controller/register.controller';

/**
 * Module for authentication and authorization.
 */
class AuthModule extends Module {
    /**
     * @inheritdoc
     */
    override getMetadata(): { name: string, version: number } {
        return {
            name: "auth-module",
            version: 1
        };
    }
    
    /**
     * @inheritdoc
     */
    override getContentProviders(): ContentProvider[] {
        return [authContentProvider];
    }

    /**
     * @inheritdoc
     */
    override getControllers(): IController[] {
        return [
            authGuardController,
            loginController,
            registerController
        ];
    }
}

export default new AuthModule();