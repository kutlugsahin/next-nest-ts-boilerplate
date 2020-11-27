import { Module } from '@nestjs/common';
import { AuthModule } from './authModule/auth.module';
import { BusinessModule } from './business/business.module';
import { FooController } from './controllers/fooController';
import { AuthUserService } from './services/UserService';

@Module({
  imports: [BusinessModule, AuthModule.config({
    secret: 'secret',
    tokenExpireIn: '5s',
    refreshTokenExpireIn: '1d',
    
  }, AuthUserService)],
  providers: [AuthUserService],
  controllers: [FooController]
})
export class AppModule { }
