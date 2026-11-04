import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { CursosService } from './cursos.service.js';
import { CreateCursoDto } from './dto/create-curso.dto.js';
import { UpdateCursoDto } from './dto/update-curso.dto.js';

@Controller('cursos')
export class CursosController {
    constructor(
        private readonly cursosService:
            CursosService,
    ) { }

    @Get()
    findAll() {
        return this.cursosService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.cursosService.findById(id);
    }

    @Post()
    create(
        @Body()
        data: CreateCursoDto
    ) {
        return this.cursosService.create(data);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        id: number,

        @Body()
        data: UpdateCursoDto,
    ) {
        return this.cursosService.update(
            id,
            data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.cursosService.delete(id);
    }
}