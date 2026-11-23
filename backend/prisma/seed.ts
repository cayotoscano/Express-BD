import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL nao definida; crie backend/.env antes do seed.");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Desenvolvimento Frontend", slug: "frontend" },
  { name: "Desenvolvimento Backend", slug: "backend" },
  { name: "Banco de Dados", slug: "banco-de-dados" },
];

async function main(): Promise<void> {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
  }

  console.log("As tres categorias do DevFlix foram cadastradas.");
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
