import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CategoryService } from './category.service';

import { ICategory } from './interfaces/category.interface';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Public } from 'src/common/decorators';


@Controller('v1/category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { };


    @Post('')
    async createCategory(
        @Body() data: CreateCategoryDto
    ): Promise<CreateCategoryDto> {
        return await this.categoryService.createCategory(
            data,
        );
    };


    @Public()
    @Get(':id')
    async getCategory(
        @Param('id') id: number
    ): Promise<ICategory> {
        return await this.categoryService.getCategory(
            id,
        );
    };


    @Public()
    @Get('')
    async getCategories(): Promise<ICategory[]>{
        return this.categoryService.getCategories();
    };

    
    @Put(':id')
    async updateCategory(
        @Param('id') id: string,
        @Body() data: UpdateCategoryDto
    ): Promise<UpdateCategoryDto> {
        return await this.categoryService.updateCategory(
            Number(id),
            data,
        );
    };


    @Delete(':id')
    async deleteCategory(@Param('id') id: string,): Promise<ICategory> {
        return await this.categoryService.deleteCategory(
            Number(id),
        );
    };
}
