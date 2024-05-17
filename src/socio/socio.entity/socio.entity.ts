/* eslint-disable prettier/prettier */
import { ClubEntity } from "src/club/club.entity/club.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class SocioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fechaNacimento: Date;

    @Column()
    correo: string;

    @ManyToMany(()=> ClubEntity, club => club.socios)
    clubs: ClubEntity[]
}
