import { Body, ConflictException, Controller, Inject, Post, Req, Res, UnauthorizedException, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthConfig, UserService } from './AuthService';
import { ValidationService } from './validationService';

export class RefreshToken {
    token: string;
}

@Controller('auth')
export class AuthController {
    constructor(@Inject('AuthConfig') private authConfig: AuthConfig, @Inject('UserService') private userBusiness: UserService, private validation: ValidationService) { }

    private async createTokenResponse(response: Response, payload: any) {
        const { tokenExpireIn, refreshTokenExpireIn } = this.authConfig;

        const accesstoken = await this.validation.createToken(payload, tokenExpireIn);
        const refreshToken = await this.validation.createToken({ token: accesstoken }, refreshTokenExpireIn);

        response.cookie('token', accesstoken, { httpOnly: true });
        return response.json({
            refreshToken,
        })
    }

    @Get('/')
    index() {
        return {
            login: false,
        }
    }

    @Post('/login')
    async login(@Body() loginInfo: any, @Res() response: Response) {
        console.log('login called');
        const user = await this.userBusiness.getUser(loginInfo);

        if (this.userBusiness.validatePassword(loginInfo, user)) {
            return this.createTokenResponse(response, await this.userBusiness.getJWTPayload(user));
        }

        throw new UnauthorizedException();
    }

    @Post('/register')
    async register(@Body() registerInfo: any, @Res() response: Response) {

        const user = await this.userBusiness.getUser(registerInfo);

        if (user != null) {
            throw new ConflictException('user exists');
        }

        const savedUser = await this.userBusiness.saveUser(registerInfo);

        return this.createTokenResponse(response, await this.userBusiness.getJWTPayload(savedUser));
    }

    @Post('/refreshToken')
    async replaceToken(@Body() refreshTokenBody: RefreshToken, @Req() request: Request, @Res() response: Response) {
        try {
            const token = request.cookies.token;
            const refreshToken = refreshTokenBody.token;

            const decodedToken = await this.validation.validate(refreshToken);

            if (token === decodedToken.token) {
                const payload = await this.validation.validate(token, true);
                return this.createTokenResponse(response, payload);
            } else {
                return response.sendStatus(401);
            }
        } catch (err) {
            response.sendStatus(401);
        }
    }
}