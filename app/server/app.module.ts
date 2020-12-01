import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './controllers/AppController';
import { NextModule } from './nextModule/next.module';

import { createProxyMiddleware } from 'http-proxy-middleware';
import env from '../../utils/env';
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
        NextModule.forRoot(),
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        // if (isDev) {
            consumer
                .apply(proxymiddleware)
                .forRoutes(API_BASE);
        // }
    }
 }
