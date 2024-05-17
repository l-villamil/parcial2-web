/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity/socio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'

@Injectable()
export class SocioService {
    //Constructor
    constructor(
        @InjectRepository(SocioEntity)
        private readonly socioRepository: Repository<SocioEntity>
    ){}

    //Create nuevo socio
    async create(socio: SocioEntity): Promise<SocioEntity>{
        return await this.socioRepository.save(socio); 
    }

    // get all socios
    async findAll(): Promise <SocioEntity[]>{
    return await this.socioRepository.find({relations : ["clubs"]})}

    // get socio by id    
    async findOne(id: string): Promise<SocioEntity> {
        const socio: SocioEntity = await this.socioRepository.findOne({where: {id}, relations:["clubs"] } );
        if (!socio)
          throw new BusinessLogicException("El socio con el id dado no se encontro", BusinessError.NOT_FOUND);
   
        return socio;
    }

    // update socio by id
    async update(id: string, socio: SocioEntity): Promise<SocioEntity> {
        const persitedSocio: SocioEntity = await this.socioRepository.findOne({where:{id}});
        if (!persitedSocio)
          throw new BusinessLogicException("El socio con el id dado no se encontro", BusinessError.NOT_FOUND);
        
        return await this.socioRepository.save({...persitedSocio, ...socio});
    }

    async delete(id: string) {
        const socio: SocioEntity = await this.socioRepository.findOne({where:{id}});
        if (!socio)
          throw new BusinessLogicException("El socio con el id dado no se encontro", BusinessError.NOT_FOUND);
     
        await this.socioRepository.remove(socio);
    }
}
