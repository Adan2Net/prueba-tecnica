import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nombre: string;

  @Column()
  presupuesto: number;

  @Column({ default: false })
  completed: boolean;

  @OneToMany(() => Empleado, (empleado) => empleado.departamento)
  empleado: Empleado[];
}
