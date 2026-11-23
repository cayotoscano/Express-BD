import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    id: "frontend",
    title: "Desenvolvimento Frontend",
    courses: [
      {
        id: 1,
        title: "Introdução ao React",
        description: "Conheça os fundamentos do React.",
        videoId: "Tn6-PIqc4UM",
      },
      {
        id: 2,
        title: "JavaScript Moderno",
        description: "Aprenda conceitos de JavaScript.",
        videoId: "W6NZfCO5SIk",
      },
    ],
  },
  {
    id: "backend",
    title: "Desenvolvimento Backend",
    courses: [
      {
        id: 3,
        title: "Node.js para Iniciantes",
        description: "Introdução ao ambiente Node.js.",
        videoId: "TlB_eWDSMt4",
      },
      {
        id: 4,
        title: "APIs com Node.js",
        description: "Conheça o desenvolvimento de APIs.",
        videoId: "Oe421EPjeBE",
      },
    ],
  },
  {
    id: "database",
    title: "Banco de Dados",
    courses: [
      {
        id: 5,
        title: "SQL para Iniciantes",
        description: "Aprenda consultas, filtros e relacionamentos com SQL.",
        videoId: "HXV3zeQKqGY",
      },
      {
        id: 6,
        title: "PostgreSQL do Zero",
        description: "Conheça o PostgreSQL e pratique comandos essenciais.",
        videoId: "qw--VYLpxG4",
      },
      {
        id: 7,
        title: "MongoDB para Iniciantes",
        description: "Aprenda os conceitos básicos de bancos NoSQL com MongoDB.",
        videoId: "c2M-rlkkT5o",
      },
    ],
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { title: category.title },
      create: { id: category.id, title: category.title },
    });

    for (const course of category.courses) {
      await prisma.course.upsert({
        where: { id: course.id },
        update: { ...course, categoryId: category.id },
        create: { ...course, categoryId: category.id },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
