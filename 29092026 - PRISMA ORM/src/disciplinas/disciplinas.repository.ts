import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DisciplinasRepository {
    constructor(
        private readonly prisma:
            PrismaService,
    ) { }

    async findAll() {
        return this.prisma.disciplina.findMany({
            orderBy: {
                id: 'asc',
            },
            include: {
                professores: true,
            },
        });
    }

    async findById(id: number) {
        return this.prisma.disciplina.findUnique({
            where: {
                id,
            },
            include: {
                professores: true,
            },
        });
    }

    async create(
        nome: string,
        cargaHoraria: number
    ) {
        return this.prisma.disciplina.create({
            data: {
                nome,
                cargaHoraria
            },
        });
    }

    async update(
        id: number,
        nome: string,
        cargaHoraria: number
    ) {
        return this.prisma.disciplina.update({
            where: {
                id,
            },

            data: {
                nome,
                cargaHoraria
            },
        });
    }

    async delete(id: number) {
        return this.prisma.disciplina.delete({
            where: {
                id,
            },
        });
    }
}