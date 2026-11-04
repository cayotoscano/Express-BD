import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfessoresRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findAll() {
        return this.prisma.professor.findMany({
            orderBy: {
                id: 'asc',
            },
            include: {
                disciplinas: true,
            },
        });
    }

    async findById(id: number) {
        return this.prisma.professor.findUnique({
            where: {
                id,
            },
            include: {
                disciplinas: true,
            },
        });
    }

    async create(
        nome: string,
        disciplinaIds: number[]
    ) {
        return this.prisma.professor.create({
            data: {
                nome,
                disciplinas: {
                    connect: disciplinaIds.map(id => ({ id })),
                },
            },
            include: {
                disciplinas: true,
            },
        });
    }

    async update(
        id: number,
        nome?: string,
        disciplinaIds?: number[],
    ) {
        return this.prisma.professor.update({
            where: {
                id,
            },

            data: {
                nome,
                disciplinas: disciplinaIds !== undefined
                    ? {
                        set: disciplinaIds.map(id => ({ id })),
                    }
                    : undefined,
            },
            include: {
                disciplinas: true,
            },
        });
    }

    async delete(id: number) {
        return this.prisma.professor.delete({
            where: {
                id,
            },
        });
    }
}