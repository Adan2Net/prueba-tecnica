import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepartamentoService } from './../services/departamento.service';

@Controller('departamento')
export class DepartamentoController {
  constructor(private departamentoService: DepartamentoService) {}

  @Get()
  getAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  findOneBy(@Param('id') id: string) {
    return this.departamentoService.findOneBy({
      codigo: id,
    });
  }

  @Post()
  create(@Body() body: any) {
    return this.departamentoService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const departamentoId = parseInt(id, 10); // Convertir el id a un número entero
    const result = this.departamentoService.update(departamentoId, data);
    return result;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.departamentoService.remove(id);
  }
}
