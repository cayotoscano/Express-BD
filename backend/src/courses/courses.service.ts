import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({
      include: {
        category: true,
        lessons: { orderBy: { position: "asc" } },
      },
      orderBy: { title: "asc" },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        lessons: { orderBy: { position: "asc" } },
      },
    });

    if (!course) {
      throw new NotFoundException("Curso não encontrado");
    }

    return course;
  }
}
