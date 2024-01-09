import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateAuthorDto from './dto/create-author.dto';
import IAuthor from './interfaces/author.interface';
import UpdateAuthorDto from './dto/update-author.dto';
import { PaginatedOutputDto } from 'src/common/dto/paginate.dto';


@Injectable()
export class AuthorService {
    constructor(private prismaService: PrismaService) {
    };


    async createAuthor(data: CreateAuthorDto): Promise<CreateAuthorDto> {
        return this.prismaService.author.create(
            {
                data,
            },
        );
    };


    async getAuthors(
        page: number,
        perPage: number,
    ): Promise<PaginatedOutputDto<IAuthor>> {
        const authors: IAuthor[] = await this.prismaService.author.findMany(
            {
                orderBy: {
                    id: 'desc',
                },
                skip: page * perPage,
                take: perPage,
            },
        );

        const response: PaginatedOutputDto<IAuthor> = {
            data: authors,
            meta: {
                currentPage: page,
                lastPage: authors.length / perPage,
                next: page++,
                prev: page--,
                perPage: perPage,
                total: authors.length,
            },
        };
        return response;
    };



    async getAuthor(id: number): Promise<IAuthor> {
        return this.prismaService.author.findUnique({
            where: {
                id,
            },
        });
    };


    async updateAuthor(
        id: number,
        data: UpdateAuthorDto,
    ): Promise<UpdateAuthorDto> {
        return this.prismaService.author.update({
            where: {
                id,
            },
            data,
        });
    };


    async deleteAuthor(id: number): Promise<IAuthor> {
        return this.prismaService.author.delete({
            where: {
                id,
            },
        });
    };
};
