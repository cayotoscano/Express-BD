import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  getCategories() {
    return this.prisma.category.findMany({
      orderBy: { id: "asc" },
      include: { courses: { orderBy: { id: "asc" } } },
    });
  }

  async getCourse(id: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException("Aula não encontrada.");
    return course;
  }

  async getFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      select: { courseId: true },
      orderBy: { createdAt: "asc" },
    });
    return { courseIds: favorites.map(({ courseId }) => courseId) };
  }

  async updateFavorites(userId: string, courseIds: number[]) {
    const validCourses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true },
    });
    const validIds = validCourses.map(({ id }) => id);

    await this.prisma.$transaction([
      this.prisma.favorite.deleteMany({ where: { userId } }),
      ...(validIds.length > 0
        ? [
            this.prisma.favorite.createMany({
              data: validIds.map((courseId) => ({ userId, courseId })),
            }),
          ]
        : []),
    ]);

    return { courseIds: validIds };
  }
}
