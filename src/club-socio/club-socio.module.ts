/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity/club.entity';
import { ClubSocioService } from './club-socio.service';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { ClubSocioController } from './club-socio.controller';

@Module({
  providers: [ClubSocioService],
  imports: [TypeOrmModule.forFeature([ClubEntity,SocioEntity])],
  controllers: [ClubSocioController]
  
})
export class ClubSocioModule {}
