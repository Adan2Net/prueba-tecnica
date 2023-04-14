### 1. Create project
```bash
npm i -g @nestjs/cli
nest new prueba-tecnica
npm run start:dev
```
### 2. Overview and delete files
### 3. Create module
```bash
nest g mo empleado
nest g s empleado/services/empleado
nest g s empleado/services/empleado --flat
nest g co empleado/controllers/empleado --flat
```
### 4. Check endpoint and create CRUD
```ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

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

```
### 5. Intall DB (Docker)
```yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=prueba
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=12345678
    ports:
      - '5432:5432'
    volumes:
      - ./postgres_data:/var/lib/postgresql
```
### 6. Add .gitignore /postgres_data
```bash
docker-compose up -d postgres
docker-compose exec postgres bash
psql -h localhost -d my_db -U nico
\d+
\q
```
### 7. Intall TypeOrm
```bash
npm install --save @nestjs/typeorm typeorm pg
```
### 8. App Module
```ts
import { Module } from '@nestjs/common';
import { EmpleadoModule } from './empleado/empleado.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '12345678',
      database: 'prueba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    EmpleadoModule,
    DepartamentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
### 9. Empleado Entity
```ts
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

```
### 10. Empleado Module
```ts
import { Module } from '@nestjs/common';
import { EmpleadoService } from './services/empleado.service';
import { EmpleadoController } from './controllers/empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado])],
  providers: [EmpleadoService],
  controllers: [EmpleadoController],
})
export class EmpleadoModule {}

```
### 11 Service
```ts
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
```
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# prueba-tecnica
