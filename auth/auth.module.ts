import { DynamicModule, Type } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { AuthController } from './authController';
import { AuthInterceptor } from './authGuard';
import { AuthConfig, UserService } from './AuthService';
import { ValidationService } from './validationService';



export class AuthModule {
    public static async config(cfg: AuthConfig, userService: Type<UserService>): Promise<DynamicModule> {
        return {
            module: AuthModule,
            controllers: [AuthController],
            imports: [BusinessModule],
            providers: [
                {
                    provide: 'AuthConfig',
                    useValue: cfg,
                },
                {
                    provide: 'UserService',
                    useClass: userService
                },
                ValidationService,
                AuthInterceptor
            ],
            exports: [
                ValidationService,
                AuthInterceptor,
                {
                    provide: 'UserService',
                    useClass: userService
                }
            ],
        }
    }
}