import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export default class CreateAuthorDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;
}