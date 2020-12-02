import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: false });
    app.use(cookieParser())
    await app.listen(3000);
}
bootstrap();