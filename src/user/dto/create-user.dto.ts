import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export default class CreateUserDto{
    @IsNotEmpty()
    fistName: string;

    @IsString()
    @IsNotEmpty()
    latsName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}