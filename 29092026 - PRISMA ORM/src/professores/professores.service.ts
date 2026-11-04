import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfessoresRepository } from './professores.repository.js';
import { CreateProfessorDto } from './dto/create-professor.dto.js';
import { UpdateProfessorDto } from './dto/update-professor.dto.js';

@Injectable()
export class ProfessoresService {
    constructor(
        private readonly professoresRepository:
            ProfessoresRepository,
    ) { }

    findAll() {
        return this.professoresRepository.findAll();
    }

    async findById(id: number) {
        const professor =
            await this.professoresRepository.findById(
                id,
            );

        if (!professor) {
            throw new NotFoundException(
                'Professor não encontrado',
            );
        }

        return professor;
    }

    create(data: CreateProfessorDto) {
        return this.professoresRepository.create(
            data.nome,
            data.disciplinaIds
        );

    }

    async update(
        id: number,
        data: UpdateProfessorDto,
    ) {
        const professor = await this.findById(id);

        return this.professoresRepository.update(
            id,
            data.nome ?? professor.nome,
            data.disciplinaIds
        );
    }

    async delete(id: number) {
        await this.findById(id);

        await this.professoresRepository.delete(id);
    }

}
