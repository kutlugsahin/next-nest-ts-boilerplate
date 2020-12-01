import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user';

@Injectable()
export class UserBusiness {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    public async getUserByMail(email: string) {
        return this.userModel.findOne({ email });
    }

    public async getUserById(id: string) {
        return this.userModel.findById(id);
    }

    public async saveUser(user: User): Promise<UserDocument> {
        return this.userModel.create(user);
    }
}