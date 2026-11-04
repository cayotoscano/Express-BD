import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ProfessoresService } from './professores.service.js';
import { CreateProfessorDto } from './dto/create-professor.dto.js';
import { UpdateProfessorDto } from './dto/update-professor.dto.js';

@Controller('professores')
export class ProfessoresController {
    constructor(
        private readonly professoresService: ProfessoresService,
    ) { }

    @Get()
    findAll() {
        return this.professoresService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.professoresService.findById(id);
    }

    @Post()
    create(
        @Body()
        data: CreateProfessorDto,
    ) {
        return this.professoresService.create(data);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        id: number,

        @Body()
        data: UpdateProfessorDto,
    ) {
        return this.professoresService.update(
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
        return this.professoresService.delete(id);
    }
}
