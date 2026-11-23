import { Test } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaService } from "../prisma/prisma.service.js";
import { CoursesService } from "./courses.service.js";

describe("CoursesService", () => {
  const courses = [
    {
      id: 1,
      title: "React para Iniciantes",
      slug: "react-iniciantes",
      category: { id: 1, name: "Desenvolvimento Frontend", slug: "frontend" },
      lessons: [{ id: 1, title: "Introdução ao React", position: 1 }],
    },
  ];
  const prismaMock = {
    course: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  };
  let coursesService: CoursesService;

  beforeEach(async () => {
    vi.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: prismaMock },
        {
          provide: CoursesService,
          useFactory: (prisma: PrismaService) => new CoursesService(prisma),
          inject: [PrismaService],
        },
      ],
    }).compile();

    coursesService = moduleRef.get(CoursesService);
  });

  it("lists courses with category and ordered lessons", async () => {
    prismaMock.course.findMany.mockResolvedValue(courses);

    await expect(coursesService.findAll()).resolves.toEqual(courses);
    expect(prismaMock.course.findMany).toHaveBeenCalledWith({
      include: {
        category: true,
        lessons: { orderBy: { position: "asc" } },
      },
      orderBy: { title: "asc" },
    });
  });

  it("finds a course by its id", async () => {
    prismaMock.course.findUnique.mockResolvedValue(courses[0]);

    await expect(coursesService.findOne(1)).resolves.toEqual(courses[0]);
    expect(prismaMock.course.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        category: true,
        lessons: { orderBy: { position: "asc" } },
      },
    });
  });

  it("throws NotFoundException when the course does not exist", async () => {
    prismaMock.course.findUnique.mockResolvedValue(null);
    const result = coursesService.findOne(999999);

    await expect(result).rejects.toBeInstanceOf(NotFoundException);
    await expect(result).rejects.toThrow("Curso não encontrado");
  });
});

// Teste unitario: PrismaService e mockado, sem conexao com PostgreSQL.
// Com Jest, use jest.fn() e adapte a configuracao para o runner do Jest.
