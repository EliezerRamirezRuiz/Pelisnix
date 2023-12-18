import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// Dto
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// hashing
import * as bcript from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    };


    async updateDataUser(
        userId: number,
        userDto: UpdateUserDto,
        refreshToken: string
    ): Promise<UpdateUserDto> {
        const user: UpdateUserDto = await this.prismaService.user.update({
            where: {
                id: userId,
                hashedRt: refreshToken
            },
            data: {
                email: userDto.email,
                firstName: userDto.firstName,
                lastName: userDto.lastName
            },
        });

        return user;
    };


    async updatePasswordUser(
        userId: number,
        userPassword: string,
        refreshToken: string
    ): Promise<UpdateUserDto> {
        const hashPassword = await bcript.hash(userPassword, 10);

        const user = await this.prismaService.user.update({
            where: {
                id: userId,
                hashedRt: refreshToken,
            },
            data: {
                hashedPassword: hashPassword,
            },
        });

        return user;
    };


    async deleteUser(
        id: number,
        userId: number,
        refreshToken: string,
    ): Promise<DeleteUserDto> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new NotFoundException('User Not Found');

        if (id !== userId) throw new ForbiddenException('Not Owner account');

        if (user.hashedRt !== refreshToken) throw new ForbiddenException('Access Denied');

        const userDeleted: DeleteUserDto = await this.prismaService.user.delete({
            where: {
                id: user.id
            },
        });

        return userDeleted;
    };
};
