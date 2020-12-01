export interface AuthConfig {
    secret: string;
    tokenExpireIn: string;
    refreshTokenExpireIn: string;
}

export interface AuthUser {
    id: string;
    email: string;
    password: string;
}

export interface UserService<TLogin = any, TRegister = any, TUser = any, TPayload = any, TUserDecorator = any> {
    getUser(loginInfo: TLogin | TRegister): Promise<TUser | null>;
    saveUser(user: TRegister): Promise<TUser>;
    validatePassword(loginInfo: TLogin, user: TUser): Promise<boolean>;
    getJWTPayload(user: TUser): Promise<TPayload>;
    createUserParamDecorator(payload: TPayload): TUserDecorator;
}