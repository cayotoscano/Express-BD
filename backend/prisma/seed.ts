import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL nao definida; crie backend/.env antes do seed.");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const frontend = await prisma.category.upsert({
    where: { slug: "frontend" },
    update: { name: "Desenvolvimento Frontend" },
    create: { name: "Desenvolvimento Frontend", slug: "frontend" },
  });
  const backend = await prisma.category.upsert({
    where: { slug: "backend" },
    update: { name: "Desenvolvimento Backend" },
    create: { name: "Desenvolvimento Backend", slug: "backend" },
  });
  const databases = await prisma.category.upsert({
    where: { slug: "banco-de-dados" },
    update: { name: "Banco de Dados" },
    create: { name: "Banco de Dados", slug: "banco-de-dados" },
  });

  const reactCourse = await prisma.course.upsert({
    where: { slug: "react-iniciantes" },
    update: {
      title: "React para Iniciantes",
      description: "Aprenda os fundamentos de React e construa interfaces.",
      published: true,
      categoryId: frontend.id,
    },
    create: {
      title: "React para Iniciantes",
      slug: "react-iniciantes",
      description: "Aprenda os fundamentos de React e construa interfaces.",
      published: true,
      categoryId: frontend.id,
    },
  });
  const nodeCourse = await prisma.course.upsert({
    where: { slug: "nodejs-iniciantes" },
    update: {
      title: "Node.js para Iniciantes",
      description: "Conheca o ambiente Node.js e os primeiros passos.",
      published: true,
      categoryId: backend.id,
    },
    create: {
      title: "Node.js para Iniciantes",
      slug: "nodejs-iniciantes",
      description: "Conheca o ambiente Node.js e os primeiros passos.",
      published: true,
      categoryId: backend.id,
    },
  });
  const sqlCourse = await prisma.course.upsert({
    where: { slug: "sql-fundamentos" },
    update: {
      title: "Fundamentos de SQL",
      description: "Aprenda os conceitos fundamentais de bancos relacionais.",
      published: true,
      categoryId: databases.id,
    },
    create: {
      title: "Fundamentos de SQL",
      slug: "sql-fundamentos",
      description: "Aprenda os conceitos fundamentais de bancos relacionais.",
      published: true,
      categoryId: databases.id,
    },
  });

  const lessons = [
    {
      courseId: reactCourse.id,
      position: 1,
      title: "Introdução ao React",
      videoId: "Tn6-PIqc4UM",
    },
    {
      courseId: reactCourse.id,
      position: 2,
      title: "Componentes e JSX",
      videoId: "w7ejDZ8SWv8",
    },
    {
      courseId: nodeCourse.id,
      position: 1,
      title: "Introdução ao Node.js",
      videoId: "TlB_eWDSMt4",
    },
    {
      courseId: sqlCourse.id,
      position: 1,
      title: "Introdução aos Bancos de Dados",
      videoId: "HXV3zeQKqGY",
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: {
        courseId_position: {
          courseId: lesson.courseId,
          position: lesson.position,
        },
      },
      update: {
        title: lesson.title,
        videoId: lesson.videoId,
        description: null,
      },
      create: lesson,
    });
  }

  console.log("Categorias, cursos e aulas do DevFlix cadastrados com sucesso.");
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
