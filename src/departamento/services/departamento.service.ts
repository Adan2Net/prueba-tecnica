import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './../entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepo: Repository<Departamento>,
  ) {}

  findAll() {
    return this.departamentoRepo.find();
  }

  findOneBy(id) {
    return this.departamentoRepo.findOneBy(id);
  }

  create(body: any) {
    const newDepartamento = this.departamentoRepo.create(body);
    return this.departamentoRepo.save(newDepartamento);
  }

  async update(id, data: any) {
    try {
      const departamento = await this.departamentoRepo.findOne({ where: id });
      const updatedDepartamento = this.departamentoRepo.create({
        ...departamento,
        ...data,
      });
      return await this.departamentoRepo.save(updatedDepartamento);
    } catch (error) {
      console.log(error);
      return 'Error al actualizar departamento';
      throw new Error('Error al actualizar el departamento.');
    }
  }

  async remove(id: number) {
    await this.departamentoRepo.delete(id);
    return 'El departamento #' + id + ' ha sido eliminado';
  }
}
