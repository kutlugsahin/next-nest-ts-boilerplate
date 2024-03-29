import { sign, verify } from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';

import { AuthConfig } from './AuthService';

export const TOKEN_EXPIRED = 'TokenExpiredError';

@Injectable()
export class ValidationService {
    constructor(@Inject('AuthConfig') private authConfig: AuthConfig) { }

    async validate(token: string, ignoreExp?: boolean): Promise<any | null> {
        
        try {
            return (verify(token, this.authConfig.secret, { ignoreExpiration: ignoreExp }) as any).data;
        } catch (error) {
            return null;
        }
    }

    async createToken(payload: object, expiresIn?: string | number): Promise<string> {
        return sign({
            data: payload,
        }, this.authConfig.secret, { expiresIn });
    }
}