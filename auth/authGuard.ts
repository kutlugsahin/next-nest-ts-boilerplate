import { CanActivate, createParamDecorator, ExecutionContext, Inject, Injectable, UnauthorizedException, UseGuards, Catch, HttpException, ExceptionFilter, ArgumentsHost, applyDecorators, UseFilters, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthConfig, UserService } from './AuthService';
import { ValidationService } from './validationService';
import { Response } from 'express';

export class ApiUnauthorizedException extends HttpException  {
    constructor() {
        super('ApiUnauthorized', HttpStatus.UNAUTHORIZED);
    }
}

export class PageUnauthorizedException extends HttpException  {
    constructor() {
        super('PageUnauthorized', HttpStatus.UNAUTHORIZED);
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    private tokenKey: string;

    constructor(private validation: ValidationService, @Inject('AuthConfig') private authConfig: AuthConfig, @Inject('UserService') private userService: UserService) { 
        this.tokenKey = authConfig.type === 'api' ? authConfig.apiTokenKey : authConfig.pageTokenKey;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        const token = req.cookies[this.tokenKey];

        if (token) {
            const payload = await this.validation.validate(token);

            if (payload) {
                (req as any).user = this.userService.createUserParamDecorator(payload);
                return true;
            }
        }

        if (this.authConfig.type === 'api') {
            throw new ApiUnauthorizedException();
        } else {
            throw new PageUnauthorizedException();
        }
    }
}

@Catch(PageUnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: PageUnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        return response.redirect('/login');
    }
}

export const Auth = () => applyDecorators(UseGuards(AuthGuard), UseFilters(UnauthorizedExceptionFilter))

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
})