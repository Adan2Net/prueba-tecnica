import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  all(): string {
    return 'Get method';
  }

  new(): string {
    return 'Create Method';
  }

  update(): string {
    return 'Update method';
  }

  delete(): string {
    return 'Delete method';
  }
}
