import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ICategory } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('v1/category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { };


    async createCategory(
        @Body() data: CreateCategoryDto
    ): Promise<CreateCategoryDto> {
        return await this.categoryService.createCategory(data);
    };


    @Get(':id')
    async getCategoryById(
        @Param('id') id: number
    ): Promise<ICategory> {
        return await this.categoryService.getCategoryById(id);
    };


    @Get(':name')
    async getCategoryByName(
        @Param('name') name: string
    ): Promise<ICategory> {
        return await this.categoryService.getCategoryByName(name);
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
    async deleteCategory(
        @Param('id') id: string,
    ) {
        return await this.categoryService.deleteCategory(Number(id));
    };
}
