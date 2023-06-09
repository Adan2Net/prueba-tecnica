import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentoController } from './departamento.controller';

describe('DepartamentoController', () => {
  let controller: DepartamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentoController],
    }).compile();

    controller = module.get<DepartamentoController>(DepartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
