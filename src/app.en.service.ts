import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppEnService implements AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
