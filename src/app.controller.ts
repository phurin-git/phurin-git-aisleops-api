import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("health/live")
  live() {
    return {
      status: "ok",
      service: "warehouse-api",
      timestamp: new Date().toISOString(),
    };
  }
}
