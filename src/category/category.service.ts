import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ICategory } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) { };


    async createCategory(data: CreateCategoryDto): Promise<CreateCategoryDto> {
        return await this.prismaService.category.create({
            data,
        });
    };


    async getCategories(): Promise<ICategory[]> {
        return await this.prismaService.category.findMany();
    };


    async getCategory(id: number): Promise<ICategory> {
        return await this.prismaService.category.findUnique({
            where: {
                id,
            },
        });
    };


    async updateCategory(id: number, data: UpdateCategoryDto): Promise<UpdateCategoryDto> {
        return await this.prismaService.category.update({
            where: {
                id,
            },
            data,
        });
    };


    async deleteCategory(id: number): Promise<ICategory> {
        return await this.prismaService.category.delete({
            where: {
                id,
            },
        });
    };
}
