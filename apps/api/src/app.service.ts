import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return 'EducaIA API ready';
  }
}
