import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Next, NextParams, NextService } from '../nextModule/nextService';
import { Auth } from '../../auth/server/authGuard';

@Controller()
export class AppController {
    constructor(private next: NextService) { }

    @Auth()
    @Get('/dashboard')
    async dashboard(@Next() params: NextParams, @Res() res) {
        return this.next.handle(params);
    }
}
