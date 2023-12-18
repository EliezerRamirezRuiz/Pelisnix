import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { IMovie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('v1/movie')
export class MovieController {
    constructor(private movieService: MovieService) { }


    @Get('/id/:id')
    async getMovieById(@Param('id') id: string): Promise<IMovie> {
        return await this.movieService.getMovieById(Number(id));
    };


    @Get('/name/:name')
    async getMovieByName(@Param('name') name: string): Promise<IMovie> {
        return await this.movieService.getMovieByName(name);
    };


    @Get('/authorId/:authorId')
    async getMovieByAuthorId(@Param('authorId') authorId: string) {
        return await this.movieService.getMovieByAuthorId(Number(authorId));
    };


    @Post('/')
    async createMovie(@Body() movie: CreateMovieDto): Promise<IMovie> {
        return this.movieService.createMovie(movie);
    };


    @Put(':id')
    async updateMovie(
        @Param('id') id: string,
        @Body() movie: UpdateMovieDto
    ): Promise<IMovie> {
        return await this.movieService.updateMovie(Number(id), movie);
    };


    @Delete(':id')
    async deleteMovie(@Param('id') id: string): Promise<IMovie> {
        return this.movieService.deleteMovie(Number(id));
    };
};
