import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppJpService implements AppService {
  getHello(): string {
    return 'イラッシャイマセ!';
  }
}
