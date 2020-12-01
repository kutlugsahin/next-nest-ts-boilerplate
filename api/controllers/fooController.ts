import { Controller, Get } from '@nestjs/common';
import { Auth, User } from '../../auth/authGuard';
import { UserBusiness } from '../../business/userBusiness';
import { UserDocument } from '../../model/user';

let i = 0;

@Auth()
@Controller('/foo')
export class FooController {
    constructor(private userBusiness: UserBusiness) {}
    
    @Get()
    async get(@User() user) {
        const userdetail: UserDocument = await this.userBusiness.getUserById(user.id)
        console.log()
        return {
            foo: `username: ${userdetail.username}; id: ${userdetail.id}; inc: ${i++}`,
        }
    }
}