/* eslint-disable prettier/prettier */
import { ClubEntity } from "../../club/club.entity/club.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SocioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    correo: string;

    @ManyToMany(()=> ClubEntity, club => club.socios)
    clubs: ClubEntity[]
}
