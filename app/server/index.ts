import express from 'express';
import next from 'next';
import { parse } from 'url';
import { proxyApi } from './apiProxy';
import env from '../../utils/env';
const { variables: { API_BASE, API_PORT, APP_PORT } } = env;

const isDev = process.env.NODE_ENV !== 'production';

// const appDir = isDev ? undefined : '../'

const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();
const server = express();

async function run() {
    await nextApp.prepare();

    if (isDev) {
        proxyApi(server);
    }

    // handle nextjs routes
    server.all('/*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    server.listen(APP_PORT, () => {
        console.log(`started application server on port ${APP_PORT}`)
    })
}


run();