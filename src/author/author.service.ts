import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateAuthorDto from './dto/create-author.dto';
import IAuthor from './interfaces/author.interface';
import UpdateAuthorDto from './dto/update-author.dto';


@Injectable()
export class AuthorService {
    constructor(private prismaService: PrismaService) {
    };


    async createAuthor(data: CreateAuthorDto): Promise<CreateAuthorDto> {
        return this.prismaService.author.create({
            data,
        });
    };


    async getAuthors(): Promise<IAuthor[]> {
        return this.prismaService.author.findMany();
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
