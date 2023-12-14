import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export default class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    fistName: string;

    @IsString()
    @IsNotEmpty()
    latsName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string; 
}