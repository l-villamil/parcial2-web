/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'


@Injectable()
export class ClubService {
    //Constructor
    constructor(
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>
    ){}

    // Validar longitud de descripcion
    private validateDescriptionLength(description: string) {
        const maxLength = 100;
        if (description.length > maxLength) {
            throw new BusinessLogicException(`La descripción no puede superar los ${maxLength} caracteres`, BusinessError.PRECONDITION_FAILED);
        }
    }

    //Create nuevo club
    async create(club: ClubEntity): Promise<ClubEntity>{
        if (club.descripcion) {
            this.validateDescriptionLength(club.descripcion);
        }
        return await this.clubRepository.save(club); 
    }

    // get all clubs
    async findAll(): Promise <ClubEntity[]>{
    return await this.clubRepository.find({relations : ["socios"]})}

    // get club by id    
    async findOne(id: string): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations:["socios"] } );
        if (!club)
          throw new BusinessLogicException("El club con el id dado no se encontro", BusinessError.NOT_FOUND);
   
        return club;
    }

    // update club by id
    async update(id: string, club: ClubEntity): Promise<ClubEntity> {
        const persitedClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!persitedClub)
          throw new BusinessLogicException("El club con el id dado no se encontro", BusinessError.NOT_FOUND);
        if (club.descripcion) {
            this.validateDescriptionLength(club.descripcion);
        }
        return await this.clubRepository.save({...persitedClub, ...club});
    }

    async delete(id: string) {
        const club: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!club)
          throw new BusinessLogicException("El club con el id dado no se encontro", BusinessError.NOT_FOUND);
     
        await this.clubRepository.remove(club);
    }
}
