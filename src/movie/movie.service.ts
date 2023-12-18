import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IMovie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';


@Injectable()
export class MovieService {
    constructor(private prismaService: PrismaService) { }


    async getMovieById(id: number): Promise<IMovie> {
        const movie = this.prismaService.movie
            .findUnique({
                where: {
                    id,
                },
            });

        return movie;
    };


    async getMovieByName(name: string): Promise<IMovie> {
        const movie = this.prismaService.movie
            .findUnique({
                where: {
                    name,
                },
            });

        return movie;
    };


    async getMovieByAuthorId(authorId: number): Promise<IMovie> {
        const movie = this.prismaService.movie.findFirst({
            where: {
                authorId,
            },
        });

        return movie;
    };


    async createMovie(movie: CreateMovieDto): Promise<IMovie> {
        const movieCreated = await this.prismaService.movie.create({
            data: {
                name: movie.name,
                duration: movie.duration,
                author: {
                    connect: {
                        id: movie.authorId
                    },
                },
                category: {
                    connect: {
                        id: movie.categoryId
                    }
                },
            },
        });

        return movieCreated;
    };


    async updateMovie(id: number, movie: UpdateMovieDto): Promise<IMovie> {
        const movieUpdated = this.prismaService.movie
            .update({
                where: {
                    id
                },
                data: {
                    name: movie.name,
                    duration: movie.duration,
                    authorId: movie.authorId,
                    categoryId: movie.categoryId,
                },
            });
        return movieUpdated;
    }


    async deleteMovie(id: number): Promise<IMovie> {
        return await this.prismaService.movie.delete({
            where: {
                id,
            },
        });
    };
};
