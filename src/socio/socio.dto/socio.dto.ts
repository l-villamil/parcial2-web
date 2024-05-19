/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class SocioDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly fechaNacimiento: Date;
    
    @IsEmail({}, { message: 'El correo electrónico debe ser válido y contener un @' })
    readonly correo: string;
}
