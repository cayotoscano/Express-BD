import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto.js';

export class UpdateCursoDto extends PartialType(CreateCursoDto) { }