import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsInt()
  @IsNotEmpty()
  cargaHoraria: number;
}