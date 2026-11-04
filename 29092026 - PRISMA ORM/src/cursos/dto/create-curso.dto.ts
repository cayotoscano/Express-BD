import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;
}