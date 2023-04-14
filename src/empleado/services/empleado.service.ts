import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './../entities/empleado.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>,
  ) {}

  findAll() {
    return this.empleadoRepo.find();
  }

  findOneBy(id) {
    return this.empleadoRepo.findOneBy(id);
  }

  create(body: any) {
    const newEmpleado = this.empleadoRepo.create(body);
    return this.empleadoRepo.save(newEmpleado);
  }

  async update(id, data: any) {
    try {
      const empleado = await this.empleadoRepo.findOne({ where: id });
      const updatedEmpleado = this.empleadoRepo.create({
        ...empleado,
        ...data,
      });
      return await this.empleadoRepo.save(updatedEmpleado);
    } catch (error) {
      console.log(error);
      return error
        .status(500)
        .send({ message: 'Error al actualizar el empleado.' });
    }
  }

  async remove(id: number) {
    await this.empleadoRepo.delete(id);
    return 'EL empleado #' + id + 'ha sido eliminado';
  }
}
