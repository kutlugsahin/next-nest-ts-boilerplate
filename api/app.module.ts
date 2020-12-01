import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BusinessModule } from '../business/business.module';
import { FooController } from './controllers/fooController';
import { AuthUserService } from '../services/UserService';
import { BarController } from 'controllers/barController';

@Module({
  imports: [BusinessModule, AuthModule.config({
    secret: 'secret',
    tokenExpireIn: '5s',
    refreshTokenExpireIn: '1d',
    
  }, AuthUserService)],
  providers: [AuthUserService],
  controllers: [FooController, BarController]
})
export class AppModule { }
