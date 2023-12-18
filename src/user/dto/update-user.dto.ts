import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
};