import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { IGender } from './interfaces/gender.interfaces';
import { UpdateGenderDto } from './dto/update-gender.dto';


@Injectable()
export class GenderService {
    constructor(private prismaService: PrismaService) {
    };


    async createGender(
        data: CreateGenderDto
    ): Promise<CreateGenderDto> {
        return await this.prismaService.gender.create({
            data
        });
    };


    async getGenders(): Promise<IGender[]> {
        return await this.prismaService.gender.findMany();
    };


    async getGenderById(id: number): Promise<IGender> {
        return await this.prismaService.gender.findUnique({
            where: {
                id,
            },
        });
    };


    async getGenderByName(name: string): Promise<IGender> {
        return await this.prismaService.gender.findUnique({
            where: {
                name,
            },
        });
    };


    async updateGender(
        id: number,
        data: UpdateGenderDto
    ): Promise<UpdateGenderDto> {
        return await this.prismaService.gender.update({
            where: {
                id,
            },
            data,
        });
    };


    async deleteGender(
        id: number
    ): Promise<IGender> {
        return await this.prismaService.gender.delete({
            where: {
                id
            },
        });
    };
};
