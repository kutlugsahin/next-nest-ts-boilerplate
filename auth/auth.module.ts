import { DynamicModule, Type } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { AuthController } from './authController';
import { AuthGuard } from './authGuard';
import { AuthConfig, UserService } from './AuthService';
import { ValidationService } from './validationService';



export class AuthModule {
    public static async config(cfg: AuthConfig, userService: Type<UserService>): Promise<DynamicModule> {

        const exports = [
            {
                provide: 'AuthConfig',
                useValue: cfg,
            },
            {
                provide: 'UserService',
                useClass: userService
            },
            ValidationService,
            AuthGuard
        ];

        return {
            module: AuthModule,
            controllers: [AuthController],
            imports: [BusinessModule],
            providers: exports,
            exports
        }
    }

    public static defaultConfig: AuthConfig = {
        secret: 'secret',
        tokenExpireIn: '5s',
        refreshTokenExpireIn: '1d',
        apiTokenKey: 'apitoken',
        pageTokenKey: 'pagetoken',
        pagetokenExpireIn: '1d',
        type: 'api',
    }
}