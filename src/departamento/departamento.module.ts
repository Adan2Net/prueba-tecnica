import { Module } from '@nestjs/common';
import { DepartamentoService } from './services/departamento.service';
import { DepartamentoController } from './controllers/departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [DepartamentoService],
  controllers: [DepartamentoController],
})
export class DepartamentoModule {}
