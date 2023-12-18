import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;
    
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
};