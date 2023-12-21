import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import CreateAuthorDto from './dto/create-author.dto';
import IAuthor from './interfaces/author.interface';
import UpdateAuthorDto from './dto/update-author.dto';
import { Public } from 'src/common/decorators';

@Controller('v1/author')
export class AuthorController {
    constructor(private authorService: AuthorService) { };


    @Post('/')
    async createAuthor(
        @Body() data: CreateAuthorDto
    ): Promise<CreateAuthorDto> {
        return await this.authorService.createAuthor(data)
    };

    
    @Public()
    @Get('/')
    async getAuthors(): Promise<IAuthor[]> {
        return await this.authorService.getAuthors();
    };


    @Public()
    @Get('/:id')
    async getAuthor(
        @Param('id') id: string
    ): Promise<IAuthor> {
        return await this.authorService.getAuthor(
            Number(id),
        );
    };


    @Put(':id')
    async updateAuthor(
        id: string,
        data: UpdateAuthorDto,
    ): Promise<UpdateAuthorDto> {
        return await this.authorService.updateAuthor(
            Number(id),
            data,
        );
    };


    @Delete(':id')
    async deleteAuthor(@Param('id') id: string): Promise<IAuthor> {
        return await this.authorService.deleteAuthor(
            Number(id),
        );
    };
}
