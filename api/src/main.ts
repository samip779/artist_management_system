import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { Environment } from './environment-config/environment-config.validation';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(helmet());

  const configService = app.get(EnvironmentConfigService);

  const port = configService.getPort();

  const nodeEnv = configService.getNodeEnv();

  if (nodeEnv !== Environment.Production) {
    const config = new DocumentBuilder()
      .setTitle('Artist management system')
      .setVersion('1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      jsonDocumentUrl: 'docs/json',
    });
  }

  await app.listen(port);
}
bootstrap();
