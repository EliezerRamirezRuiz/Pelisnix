import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteUserDto{    
    readonly id: number;
    readonly createdAt: Date;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
};