import { Injectable } from '@nestjs/common';

import { AlunosRepository } from './alunos.repository.js';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository:
      AlunosRepository,
  ) {}

  findAll() {
    return this.alunosRepository.findAll();
  }

  findById(id: number) {
    return this.alunosRepository.findById(id);
  }

  create(
    nome: string,
    curso: string,
    email: string
  ) {
    return this.alunosRepository.create(
      nome,
      curso,
      email,
    );
  }

  async update(
    id: number,
    nome: string,
    curso: string,
    email: string,
  ) {
    await this.alunosRepository.update(
      id,
      nome,
      curso,
      email,
    );

    return this.alunosRepository.findById(id);
  }

  delete(id: number) {
    return this.alunosRepository.delete(id);
  }
}