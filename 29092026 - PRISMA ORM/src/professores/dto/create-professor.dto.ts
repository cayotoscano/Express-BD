import { IsNotEmpty, IsString, MaxLength, IsArray, IsInt, Min } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  disciplinaIds: number[];
}