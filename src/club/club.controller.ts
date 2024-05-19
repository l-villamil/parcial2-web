/* eslint-disable prettier/prettier */

import { ClubService } from './club.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClubDto } from './club.dto/club.dto';
import { ClubEntity } from './club.entity/club.entity';


@Controller('club')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {
    constructor(private readonly clubServie: ClubService) {}

    @Get()
    async findAll() {
      return await this.clubServie.findAll();
    }
  
    @Get(':clubId')
    async findOne(@Param('clubId') clubId: string) {
      return await this.clubServie.findOne(clubId);
    }
  
    @Post()
    async create(@Body() clubDto: ClubDto) {
      const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
      return await this.clubServie.create(club);
    }
  
    @Put(':clubId')
    async update(@Param('clubId') clubId: string, @Body() clubDto: ClubDto) {
      const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
      return await this.clubServie.update(clubId, club);
    }
  
    @Delete(':clubId')
    @HttpCode(204)
    async delete(@Param('clubId') clubId: string) {
      return await this.clubServie.delete(clubId);
    }
}
