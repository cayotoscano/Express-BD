import { Module } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, CoursesModule],
})
export class AppModule {}
