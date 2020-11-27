import { Injectable } from '@nestjs/common';
import { UserService } from 'src/authModule/AuthService';
import { UserBusiness } from 'src/business/userBusiness';
import { UserDocument } from 'src/model/user';

export interface LoginInfo {
    email: string;
    password: string;
}

export interface RegisterInfo extends LoginInfo {
    username: string;
}

interface Payload {
    userId: string;
}

@Injectable()
export class AuthUserService implements UserService<LoginInfo, RegisterInfo, UserDocument, Payload> {
    constructor(private userBusiness: UserBusiness) { }

    async getUser(loginInfo: LoginInfo): Promise<UserDocument> {
        return this.userBusiness.getUserByMail(loginInfo.email);
    }

    async saveUser(user: RegisterInfo): Promise<UserDocument> {
        return this.userBusiness.saveUser({
            ...user
        });
    }
    async validatePassword(loginInfo: LoginInfo, user: UserDocument): Promise<boolean> {
        return loginInfo.password === user.password;
    }

    async getJWTPayload(user: UserDocument): Promise<Payload> {
        return {
            userId: user.id,
        };
    }

    async createUserParamDecorator(payload: Payload) {
        return {
            id: payload.userId
        };
    }
}