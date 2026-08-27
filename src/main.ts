import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>("PORT", 4000);

  app.setGlobalPrefix("api/v1");
  app.enableCors({ origin: config.get("WEB_ORIGIN", "http://localhost:3000") });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Warehouse Management API")
    .setDescription("Product, inventory, and stock movement endpoints")
    .setVersion("1.0")
    .build();
  SwaggerModule.setup(
    "api/docs",
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(port);
}
void bootstrap();
