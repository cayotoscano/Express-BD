import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpCode, HttpStatus, Patch, Query } from '@nestjs/common';
import { AlunosService } from './alunos.service.js';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';

@Controller('alunos')
export class AlunosController {
    constructor(
        private readonly alunosService:
            AlunosService,
    ) { }

    @Get(':id')
    findById(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.alunosService.findById(id);
    }

    @Post()
    create(
        @Body()
        data: CreateAlunoDto,
    ) {
        return this.alunosService.create(data);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        id: number,

        @Body()
        data: UpdateAlunoDto,
    ) {
        return this.alunosService.update(
            id,
            data,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.alunosService.delete(id);
    }

    @Get()
    findAll(@Query('curso') curso?: string) {
        return this.alunosService.findAll(curso);
    }

}
