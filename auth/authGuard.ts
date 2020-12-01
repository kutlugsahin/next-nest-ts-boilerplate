import { CallHandler, CanActivate, createParamDecorator, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response, Request } from 'express';
import { ValidationService } from './validationService';
import { UserService } from './AuthService';

@Injectable()
export class AuthInterceptor implements CanActivate {
    constructor(private validation: ValidationService, @Inject('UserService') private userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        const token = req.cookies.token;

        if (token) {
            const payload = await this.validation.validate(token);

            if (payload) {
                (req as any).user = this.userService.createUserParamDecorator(payload);
                return true;
            }
        }

        throw new UnauthorizedException("TokenExpiredError");
    }
}

export const Auth = () => UseGuards(AuthInterceptor);

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
})