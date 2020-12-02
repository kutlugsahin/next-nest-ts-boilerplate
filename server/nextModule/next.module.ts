import { DynamicModule } from '@nestjs/common';
import next from 'next';
import { NextService } from './nextService';
const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev, dir: '../app' });

export class NextModule {
    public static async forRoot(): Promise<DynamicModule> {
        await nextApp.prepare();

        const exports = [
            NextService,
            {
                provide: 'handler',
                useValue: nextApp.getRequestHandler(),
            }, {
                provide: 'renderer',
                useValue: nextApp.render,
            }
        ];

        return {
            module: NextModule,            
            providers: exports,
            exports,
        }
    }
}