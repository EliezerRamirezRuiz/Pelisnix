import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import CreateAuthorDto from './dto/create-author.dto';
import IAuthor from './interfaces/author.interface';
import UpdateAuthorDto from './dto/update-author.dto';
import {  Public } from 'src/common/decorators';
import { PaginatedOutputDto } from 'src/common/dto/paginate.dto';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('v1/author')
export class AuthorController {
    constructor(
        private authorService: AuthorService,
        private readonly prismaService: PrismaService) {
    };


    @Public()
    @Get('/')
    async findAll(
        @Query('page') page: number = 1,
        @Query('perPage') perPage: number = 10,
    ): Promise<PaginatedOutputDto<IAuthor>> {
        return await this.authorService.getAuthors(page, perPage);
    };


    @Post('/')
    async createOne(
        @Body() data: CreateAuthorDto
    ): Promise<CreateAuthorDto> {
        return await this.authorService.createAuthor(data)
    };



    @Public()
    @Get('/:id')
    async findOne(
        @Param('id') id: string
    ): Promise<IAuthor> {
        return await this.authorService.getAuthor(
            Number(id),
        );
    };


    @Put(':id')
    async updateOne(
        id: string,
        data: UpdateAuthorDto,
    ): Promise<UpdateAuthorDto> {
        return await this.authorService.updateAuthor(
            Number(id),
            data,
        );
    };


    @Delete(':id')
    async deleteOne(@Param('id') id: string): Promise<IAuthor> {
        return await this.authorService.deleteAuthor(
            Number(id),
        );
    };
}
