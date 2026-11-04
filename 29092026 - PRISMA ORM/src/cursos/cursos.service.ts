import { Injectable, NotFoundException } from '@nestjs/common';
import { CursosRepository } from './cursos.repository.js';
import { CreateCursoDto } from './dto/create-curso.dto.js';
import { UpdateCursoDto } from './dto/update-curso.dto.js';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursosRepository:
      CursosRepository,
  ) { }

  findAll() {
    return this.cursosRepository.findAll();
  }

  async findById(id: number) {
    const curso =
      await this.cursosRepository.findById(
        id,
      );

    if (!curso) {
      throw new NotFoundException(
        'Aluno não encontrado',
      );
    }

    return curso;
  }

  create(data: CreateCursoDto) {
    return this.cursosRepository.create(
      data.nome
    );
  }

  async update(
    id: number,
    data: UpdateCursoDto,
  ) {
    const curso = await this.findById(id);

    return this.cursosRepository.update(
      id,
      data.nome ?? curso.nome
    );
  }

  async delete(id: number) {
    await this.findById(id);

    await this.cursosRepository.delete(id);
  }
}
