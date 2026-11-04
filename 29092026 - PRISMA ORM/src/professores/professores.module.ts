import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ProfessoresController } from './professores.controller.js';
import { ProfessoresService } from './professores.service.js';
import { ProfessoresRepository } from './professores.repository.js';


@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    ProfessoresController,
  ],

  providers: [
    ProfessoresService,
    ProfessoresRepository,
  ],
})
export class ProfessoresModule {}

