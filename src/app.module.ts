import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppKoService } from './app.ko.service';
import { AppEnService } from './app.en.service';
import { AppJpService } from './app.jp.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'AppService',
      useClass: AppKoService,
    },
  ],
})
export class AppModule {}
