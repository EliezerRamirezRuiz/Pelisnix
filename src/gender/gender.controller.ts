import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { IGender } from './interfaces/gender.interfaces';
import { UpdateGenderDto } from './dto/update-gender.dto';


@Controller('v1/gender')
export class GenderController {
    constructor(private genderService: GenderService) {
    };


    @Post('')
    async createGender(
        @Body() data: CreateGenderDto
    ): Promise<CreateGenderDto> {
        return await this.genderService.createGender(
            data,
        );
    };


    async getGenders(): Promise<IGender[]> {
        return await this.genderService.getGenders();
    };


    @Get('id/:id')
    async getGenderById(
        @Param('id') id: string,
    ): Promise<IGender> {
        return await this.genderService.getGenderById(
            Number(id),
        );
    };


    @Get('name/:name')
    async getGenderByName(
        @Param('name') name: string,
    ): Promise<IGender> {
        return await this.genderService.getGenderByName(
            name,
        );
    };


    @Put('')
    async updateGender(
        @Param('id') id: string,
        @Body() data: UpdateGenderDto
    ): Promise<UpdateGenderDto> {
        return await this.genderService.updateGender(
            Number(id),
            data,
        );
    };


    @Delete('')
    async deleteGender(
        @Body() id: string,
    ): Promise<IGender> {
        return await this.genderService.deleteGender(
            Number(id),
        );
    };
};
