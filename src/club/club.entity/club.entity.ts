/* eslint-disable prettier/prettier */
import { SocioEntity } from "src/socio/socio.entity/socio.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class ClubEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fechaFundacion: Date;

    @Column()
    imagen:string;

    @Column({ length: 100 })
    descripcion:string;

    @ManyToMany(()=>SocioEntity, socio=>socio.clubs)
    @JoinTable()
    socios: SocioEntity[]




}
