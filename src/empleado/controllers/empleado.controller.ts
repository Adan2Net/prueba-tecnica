import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { EmpleadoService } from './../services/empleado.service';

@Controller('empleado')
export class EmpleadoController {
  constructor(private empleadoService: EmpleadoService) {}

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  findOneBy(@Param('id') id: string) {
    return this.empleadoService.findOneBy({
      codigo: id,
    });
  }

  @Post()
  create(@Body() body: any) {
    return this.empleadoService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const empleadoId = parseInt(id, 10); // Convertir el id a un número entero
    const result = this.empleadoService.update(empleadoId, data);
    return result;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.empleadoService.remove(id);
  }
}
