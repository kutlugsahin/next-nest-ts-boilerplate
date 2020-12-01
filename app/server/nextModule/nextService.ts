import { createParamDecorator, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { UrlWithParsedQuery, parse } from 'url';

export interface NextParams {
    req: IncomingMessage;
    res: ServerResponse;
    url: UrlWithParsedQuery;
}

export const Next = createParamDecorator((data: any, ctx: ExecutionContext): NextParams => {
    const [req, res] = ctx.getArgs();
    const parsedUrl = parse(req.url, true);
    return {
        req,
        res,
        url: parsedUrl,
    }
})


export type Handler = (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery) => Promise<void>;
export type Renderer = (req: IncomingMessage, res: ServerResponse, pathname: string, query?: ParsedUrlQuery, parsedUrl?: UrlWithParsedQuery) => Promise<void>;


@Injectable()
export class NextService {
    constructor(@Inject('handler') private handler: Handler, @Inject('renderer') private renderer: Renderer){}

    async handle(params: NextParams) {
        await this.handler(params.req, params.res, params.url);
    }

    async render(params: NextParams, path:string) {
        await this.renderer(params.req, params.res, path, params.url.query);
    }
}

