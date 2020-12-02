import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './controllers/AppController';
import { NextModule } from './nextModule/next.module';
import { AuthModule } from "../../auth/auth.module";
import { AuthUserService } from "../../services/UserService";

import { createProxyMiddleware } from 'http-proxy-middleware';
import env from '../../utils/env';
import { BusinessModule } from '../../business/business.module';
import { MainController } from './controllers/MainController';
const { variables: { API_BASE, API_PORT, APP_PORT }, isDev } = env;
const rewriteRegex = `^/${API_BASE}`

const proxymiddleware = createProxyMiddleware({
    target: `http://localhost:${API_PORT}`,
    changeOrigin: true,
    pathRewrite: {
        [rewriteRegex]: '/',
    },
})

@Module({
    imports: [
        AuthModule.config({...AuthModule.defaultConfig, type: 'page'}, AuthUserService),
        NextModule.forRoot(),
        BusinessModule,
    ],
    providers: [AuthUserService],
    controllers: [AppController, MainController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        if (isDev) {
            consumer
                .apply(proxymiddleware)
                .forRoutes(API_BASE);
        }
    }
 }
