"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  const config = app.get(config_1.ConfigService);
  const port = config.get("PORT", 4000);
  app.setGlobalPrefix("api/v1");
  app.enableCors({ origin: config.get("WEB_ORIGIN", "http://localhost:3000") });
  app.useGlobalPipes(
    new common_1.ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle("Warehouse Management API")
    .setDescription("Product, inventory, and stock movement endpoints")
    .setVersion("1.0")
    .build();
  swagger_1.SwaggerModule.setup(
    "api/docs",
    app,
    swagger_1.SwaggerModule.createDocument(app, swaggerConfig),
  );
  await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map
