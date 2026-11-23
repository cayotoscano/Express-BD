import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module.js";
import { HealthModule } from "./health/health.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    CategoriesModule,
  ],
})
export class AppModule {}
