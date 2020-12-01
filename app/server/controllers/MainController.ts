import { All, Controller, Res } from '@nestjs/common';
import { Next, NextParams, NextService } from '../nextModule/nextService';

@Controller()
export class MainController {
    constructor(private next: NextService) { }
    
    // catches res of the calls and delegates to next handler
    @All('/')
    index(@Res() res, @Next() params: NextParams) {
        return this.next.handle(params);
    }
}