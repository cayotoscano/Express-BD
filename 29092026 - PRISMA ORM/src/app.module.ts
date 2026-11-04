import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlunosModule } from './alunos/alunos.module.js';
import { ProfessoresModule } from './professores/professores.module.js';
import { DisciplinaModule } from './disciplinas/disciplinas.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CursosModule } from './cursos/cursos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AlunosModule,

    ProfessoresModule,

    DisciplinaModule,

    PrismaModule,

    CursosModule,
  ],
})
export class AppModule { }
