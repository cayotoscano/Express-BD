import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CursosRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) { }

  findAll() {
    return this.prisma.curso.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        alunos: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.curso.findUnique({
      where: {
        id,
      },
    });
  }

  create(
    nome: string
  ) {
    return this.prisma.curso.create({
      data: {
        nome
      },
    });
  }

  update(
    id: number,
    nome: string
  ) {
    return this.prisma.curso.update({
      where: {
        id,
      },

      data: {
        nome
      },
    });
  }

  delete(id: number) {
    return this.prisma.curso.delete({
      where: {
        id,
      },
    });
  }
}