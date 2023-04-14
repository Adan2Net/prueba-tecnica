import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Document Empleado')
    .setDescription('Documentación Enpoint empleado')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // URL API
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 1234);
}
bootstrap();
