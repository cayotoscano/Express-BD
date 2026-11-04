import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto.js';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto){}