import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { IMovie } from './interfaces/movie.interface';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CategoryService } from 'src/category/category.service';
import { GenderService } from 'src/gender/gender.service';
import { AuthorService } from 'src/author/author.service';


@Injectable({})
export class MovieService {
    constructor(
        private prismaService: PrismaService,
        private categoryService: CategoryService,
        private genderService: GenderService,
        private authorService: AuthorService,
    ) { };


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
        const categoryFounded = await this.categoryService.getCategory(movie.categoryId);
        if (!categoryFounded) throw new NotFoundException('category not founded');

        const genderFounded = await this.genderService.getGender(movie.genderId);
        if (!genderFounded) throw new NotFoundException('gender not found');

        const authorFounded = await this.authorService.getAuthor(movie.authorId);
        if (!authorFounded) throw new NotFoundException('author not found');

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
                        id: categoryFounded.id
                    }
                },
                genre: {
                    connect: {
                        id: genderFounded.id
                    },
                },
            },
        });

        return movieCreated;
    };


    async updateMovie(
        id: number,
        movie: UpdateMovieDto
    ): Promise<IMovie> {
        const movieUpdated = this.prismaService.movie.update({
            where: {
                id,
            },
            data: {
                name: movie.name,
                duration: movie.duration,
                authorId: movie.authorId,
                categoryId: movie.categoryId,
                genderId: movie.genderId,
            },
        });

        return movieUpdated;
    };


    async deleteMovie(id: number): Promise<IMovie> {
        return await this.prismaService.movie.delete({
            where: {
                id,
            },
        });
    };
};
