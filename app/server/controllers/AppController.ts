import { All, Controller, Get, Res } from '@nestjs/common';
import { Next, NextParams, NextService } from '../nextModule/nextService';

@Controller()
export class AppController {
    constructor(private next: NextService) { }

    @Get('/data*')
    data() {
        return {
            data: 'data'
        }
    }

}
