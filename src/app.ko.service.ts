import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppKoService implements AppService {
  getHello(): string {
    return '안녕하세요!';
  }
}
