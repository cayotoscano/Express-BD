import { IsNotEmpty, IsString, MaxLength, IsEmail, IsInt, Min } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsInt()
  @Min(1)
  cursoId: number;
}