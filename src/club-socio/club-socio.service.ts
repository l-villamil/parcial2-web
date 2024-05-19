/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity/club.entity';
import { SocioEntity } from '../socio/socio.entity/socio.entity';

@Injectable()
export class ClubSocioService {
    constructor(
        @InjectRepository(ClubEntity)
                private readonly clubRepository: Repository<ClubEntity>,
    
                @InjectRepository(SocioEntity)
                private readonly socioRepository: Repository<SocioEntity>
            ){}

     //agregar un socio a un club
        async addMemberToClub(clubId: string, memberId: string): Promise<ClubEntity> {
                const member: SocioEntity = await this.socioRepository.findOne({where: {id: memberId}});
                if (!member)
                  throw new BusinessLogicException("El socio con el id dado no fue encontrado", BusinessError.NOT_FOUND);
              
                const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]})
                if (!club)
                  throw new BusinessLogicException("El club con el id dado no fue encontrado", BusinessError.NOT_FOUND);
            
                club.socios = [...club.socios, member];
                return await this.clubRepository.save(club);
              }

        //encontrar un socio dado un club      
        async findMemberFromClub(clubId: string, memberId: string): Promise<SocioEntity> {
                const member: SocioEntity = await this.socioRepository.findOne({where: {id: memberId}});
                if (!member)
                        throw new BusinessLogicException("El socio con el id dado no fue encontrado", BusinessError.NOT_FOUND)
                
                const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
                if (!club)
                        throw new BusinessLogicException("El club con el id dado no fue encontrado", BusinessError.NOT_FOUND)
                
                const clubMember: SocioEntity = club.socios.find(e => e.id === member.id);
                
                if (!clubMember)
                        throw new BusinessLogicException("El socio con el id dado no esta asociado con el club", BusinessError.PRECONDITION_FAILED)
                
                return clubMember;
   }
   // encontrar todos los socio de un club
   async findMembersFromClub(clubId: string): Promise<SocioEntity[]> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
        if (!club)
          throw new BusinessLogicException("El club con el id dado no fue encontrado", BusinessError.NOT_FOUND)
       
        return club.socios;
    }
    // asociar una lista de socios a un club
    async updateMembersFromClub(clubId: string, members: SocioEntity[]): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
    
        if (!club)
          throw new BusinessLogicException("El club con el id dado no fue encontrado", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < members.length; i++) {
          const member: SocioEntity = await this.socioRepository.findOne({where: {id: members[i].id}});
          if (!member)
            throw new BusinessLogicException("El socio con el id dado no fue encontrado", BusinessError.NOT_FOUND)
        }
    
        club.socios = members;
        return await this.clubRepository.save(club);
      }

      //eliminar un socio de un club
      async deleteMemberFromClub(clubId: string, memberId: string){
        const member: SocioEntity = await this.socioRepository.findOne({where: {id: memberId}});
        if (!member)
          throw new BusinessLogicException("El socio con el id dado no fue encontrado", BusinessError.NOT_FOUND)
    
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
        if (!club)
          throw new BusinessLogicException("El club con el id dado no fue encontrado", BusinessError.NOT_FOUND)
    
        const memberClub: SocioEntity = club.socios.find(e => e.id === member.id);
    
        if (!memberClub)
            throw new BusinessLogicException("El socio con el id dado no esta asociado con el club", BusinessError.PRECONDITION_FAILED)
 
        club.socios = club.socios.filter(e => e.id !== memberId);
        await this.clubRepository.save(club);
    }  
}
