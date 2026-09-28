import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessoresService {
    
  private professores = [
    {
      id: 1,
      nome: 'Luiza',
      disciplina: 'Sistemas de Informação',
    },
    {
      id: 2,
      nome: 'Ícaro',
      disciplina: 'Ciência da Computação',
    },
  ];

  findAll() {
    return this.professores;
  }

  findById(id: number) {
    return this.professores.find(
      (professor) => professor.id === id,
    );
  }

  create(nome: string, disciplina: string) {
    const novoProfessor = {
      id: this.professores.length + 1,
      nome,
      disciplina,
    };

    this.professores.push(novoProfessor);

    return novoProfessor;
  }

  update(
    id: number,
    nome: string,
    disciplina: string,
  ) {
    const professor = this.professores.find(
      (professor) => professor.id === id,
    );

    if (!professor) {
      return null;
    }

    professor.nome = nome;
    professor.disciplina = disciplina;

    return professor;
  }

  delete(id: number) {
    const index = this.professores.findIndex(
      (professor) => professor.id === id,
    );

    if (index === -1) {
      return false;
    }

    this.professores.splice(index, 1);

    return true;
  }
}
