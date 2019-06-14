import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptor';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 8080;

    app.enableCors();
    app.use(helmet());
    app.use(morgan('dev'));

    app.setGlobalPrefix('api');

    const swaggerOptions = new DocumentBuilder()
        .setTitle('Answer Exchange Service')
        .setVersion('0.0.1')
        .setBasePath('api')
        .addBearerAuth('Authorization', 'header')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('/docs', app, swaggerDocument);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalInterceptors(new TransformInterceptor());

    await app.listen(PORT);
}
bootstrap();
