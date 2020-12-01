import { DynamicModule } from '@nestjs/common';
import next from 'next';
import { AppController } from '../controllers/AppController';
import { MainController } from '../controllers/MainController';
import { NextService } from './nextService';
const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev });

export class NextModule {
    public static async forRoot(): Promise<DynamicModule> {
        await nextApp.prepare();

        return {
            module: NextModule,
            controllers: [AppController, MainController],
            providers: [
                NextService,
                {
                    provide: 'handler',
                    useValue: nextApp.getRequestHandler(),
                }, {
                    provide: 'renderer',
                    useValue: nextApp.render,
                }]
        }
    }
}