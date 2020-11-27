import { Controller, Get } from '@nestjs/common';
import { Auth, User } from 'src/authModule/authGuard';

let i = 0;

@Auth()
@Controller('/foo')
export class FooController {
    
    @Get()
    async get(@User() user) {
        console.log(user);
        return {
            foo: 'bar ' + i++
        }
    }
}