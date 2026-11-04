import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AlunosRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) { }

  findById(id: number) {
    return this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });
  }

  create(
    nome: string,
    email: string,
    cursoId: number,
  ) {
    return this.prisma.aluno.create({
      data: {
        nome,
        email,
        cursoId,
      },
    });
  }

  update(
    id: number,
    nome: string,
    email: string,
    cursoId: number,
  ) {
    return this.prisma.aluno.update({
      where: {
        id,
      },

      data: {
        nome,
        email,
        cursoId,
      },
    });
  }

  delete(id: number) {
    return this.prisma.aluno.delete({
      where: {
        id,
      },
    });
  }

  async findAll(curso?: string) {
    return this.prisma.aluno.findMany({
      where: {
        curso: curso
          ? { is: { nome: curso } }
          : undefined,
      },
      include: {
        curso: true,
      },
    });
  }

}