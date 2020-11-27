import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user';
import { UserBusiness } from './userBusiness';

const connectionString = 'mongodb+srv://kutlu:0121@cluster0.fm8ir.mongodb.net/boilerplate?retryWrites=true&w=majority'

const mongooseModule = MongooseModule.forRoot(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const modelModule = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);

@Module({
    imports: [mongooseModule, modelModule],
    exports: [UserBusiness],
    providers: [UserBusiness]
})
export class BusinessModule { }