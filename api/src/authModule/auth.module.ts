import { DynamicModule, MiddlewareConsumer, Module, NestModule, Scope, Type } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { AuthController } from './authController';
import { AuthInterceptor } from './authGuard';
import { AuthConfig, UserService } from './AuthService';
import { ValidationService } from './validationService';



export class AuthModule {
    public static config(cfg: AuthConfig, userService: Type<UserService>): DynamicModule {
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