import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nif: string;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column()
  apellido2: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Departamento, (departamento) => departamento.empleado)
  departamento: Departamento;
}
