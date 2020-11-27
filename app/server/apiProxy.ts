import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import env from '../../utils/env';
const { variables: { API_BASE, API_PORT, APP_PORT } } = env;

export const proxyApi = (server: ReturnType<typeof express>) => {
    // in development api will run in different instance for development experience purposes
    // i.e not restart app in case api is changed in watch mode
    const rewriteRegex = `^/${API_BASE}`
    server.use(
        `/${API_BASE}`,
        createProxyMiddleware({
            target: `http://localhost:${API_PORT}`,
            changeOrigin: true,
            pathRewrite: {
                [rewriteRegex]: '/',
            },
        })
    );
}