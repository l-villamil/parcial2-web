/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put,  } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { SocioDto } from 'src/socio/socio.dto/socio.dto';
import { plainToInstance } from 'class-transformer';
import { SocioEntity } from 'src/socio/socio.entity/socio.entity';


@Controller('clubs')
export class ClubSocioController {
    constructor(private readonly clubSocioService: ClubSocioService) {}


    @Post(':clubId/members/:memberId')
   async addSocioClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubSocioService.addMemberToClub(clubId, memberId);
   }


   @Get(':clubId/members/:memberId')
   async findSocioByClubIdSocioId(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubSocioService.findMemberFromClub(clubId, memberId);
   }

   @Get(':clubId/members')
   async findASociosByClubId(@Param('clubId') clubId: string){
       return await this.clubSocioService.findMembersFromClub(clubId);
   }

   @Put(':clubId/members')
   async associateSocioClub(@Body() SocioDto: SocioDto[], @Param('clubId') clubId: string){
       const socios = plainToInstance(SocioEntity, SocioDto)
       return await this.clubSocioService.updateMembersFromClub(clubId, socios);
   }
   @Delete(':clubId/members/:memberId')
@HttpCode(204)
   async deleteArtworkMuseum(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubSocioService.deleteMemberFromClub(clubId, memberId);
   }
}
