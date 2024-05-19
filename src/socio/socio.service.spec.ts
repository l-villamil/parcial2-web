/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity/socio.entity';
import { faker } from '@faker-js/faker';


describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<SocioEntity>;
  let socioList: SocioEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioService],
    }).compile();
 
    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
    await seedDatabase()
  });


  const seedDatabase = async () => {
    repository.clear(); 
  
    socioList = [];
    for(let i = 0; i < 5; i++){
        const socio: SocioEntity = await repository.save({
          nombre: faker.company.name(), 
          fechaNacimiento: faker.date.anytime(),
          correo: faker.company.name()
        })
        socioList.push(socio);
    }
  }
    
  
  //Prueba que este definido
   it('should be defined', () => {
     expect(service).toBeDefined();
   });
  
  
   
  
  
  //Prueba Create club
  it('create should return a new socio', async () => {
  
    const socio: SocioEntity = {
      id: '',
      nombre: faker.company.name(), 
      fechaNacimiento: faker.date.anytime(),
      correo: faker.company.name(),
      clubs: []
    }
  
    const newSocio: SocioEntity = await service.create(socio);
  
    expect(newSocio).not.toBeNull();
  
    const storedSocio: SocioEntity = await repository.findOne({where: {id: newSocio.id}})
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.nombre).toEqual(newSocio.nombre)
    expect(storedSocio.fechaNacimiento).toEqual(newSocio.fechaNacimiento)
    expect(storedSocio.correo).toEqual(newSocio.correo)
   });
  
  
   it('findAll should return all socios', async () => {
    const socios: SocioEntity[] = await service.findAll();
    expect(socios).not.toBeNull();
    expect(socios).toHaveLength(socioList.length);
  });
  
  
  it('findOne should return a socio by id', async () => {
    const storedSocio: SocioEntity = socioList[0];
    const socio: SocioEntity = await service.findOne(storedSocio.id);
    expect(socio).not.toBeNull();
    expect(socio.nombre).toEqual(storedSocio.nombre)
    expect(socio.fechaNacimiento).toEqual(storedSocio.fechaNacimiento)
    expect(socio.correo).toEqual(storedSocio.correo)
  });
  
  it('findOne should throw an exception for an invalid club', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El socio con el id dado no se encontro")
  });
  
  
  it('update should modify a socio', async () => {
    const socio: SocioEntity = socioList[0];
    socio.nombre = "New name";
    socio.correo = "New correo";
     const updatedSocio: SocioEntity = await service.update(socio.id, socio);
    expect(updatedSocio).not.toBeNull();
     const storedSocio: SocioEntity = await repository.findOne({ where: { id: socio.id } })
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.nombre).toEqual(socio.nombre)
    expect(storedSocio.correo).toEqual(socio.correo)
  });
  
  
  
  it('update should throw an exception for an invalid socio', async () => {
    let socio: SocioEntity = socioList[0];
    socio = {
      ...socio, nombre: "New name", correo: "New correo"
    }
    await expect(() => service.update("0", socio)).rejects.toHaveProperty("message", "El socio con el id dado no se encontro")
  });
  
  
  it('delete should remove a socio', async () => {
    const socio: SocioEntity = socioList[0];
    await service.delete(socio.id);
     const deletedSocio: SocioEntity = await repository.findOne({ where: { id: socio.id } })
    expect(deletedSocio).toBeNull();
  });
  
  
  it('delete should throw an exception for an invalid socio', async () => {
    //const socio: SocioEntity = socioList[0];
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El socio con el id dado no se encontro")
  });
});
