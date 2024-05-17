/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioModule } from './socio/socio.module';
import { ClubEntity } from './club/club.entity/club.entity';

@Module({
  imports: [SocioModule,ClubEntity],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
