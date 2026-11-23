import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CoursesModule } from "./courses/courses.module.js";
import { HealthModule } from "./health/health.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    CoursesModule,
  ],
})
export class AppModule {}
