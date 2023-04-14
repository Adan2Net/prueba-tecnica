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
