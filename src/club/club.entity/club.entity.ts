/* eslint-disable prettier/prettier */
import { SocioEntity } from "../../socio/socio.entity/socio.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
