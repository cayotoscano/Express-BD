import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { DatabaseService } from '../database/database.service.js';

export interface AlunoRow extends RowDataPacket {
  id: number;
  nome: string;
  curso: string;
  email: string;
}

@Injectable()
export class AlunosRepository {
  constructor(
    private readonly databaseService:
      DatabaseService,
  ) { }

  async findAll() {
    const [rows] =
      await this.databaseService.execute<
        AlunoRow[]
      >(
        `
          SELECT id, nome, curso, email
          FROM alunos
          ORDER BY id
        `,
      );

    return rows;
  }

  async findById(id: number) {
    const [rows] =
      await this.databaseService.execute<
        AlunoRow[]
      >(
        `
        SELECT id, nome, curso, email
        FROM alunos
        WHERE id = ?
      `,
        [id],
      );

    return rows[0] ?? null;
  }

  async create(
    nome: string,
    curso: string,
    email: string
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
        INSERT INTO alunos (
          nome,
          curso,
          email
        )
        VALUES (?, ?, ?)
      `,
        [nome, curso, email],
      );

    return {
      id: result.insertId,
      nome,
      curso,
      email,
    };
  }

  async update(
    id: number,
    nome: string,
    curso: string,
    email: string,
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
        UPDATE alunos
        SET
          nome = ?,
          curso = ?,
          email = ?
        WHERE id = ?
      `,
        [
          nome,
          curso,
          email,
          id,
        ],
      );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
        DELETE FROM alunos
        WHERE id = ?
      `,
        [id],
      );

    return result.affectedRows;
  }

}