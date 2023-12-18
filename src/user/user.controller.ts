import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
// Decorator
import { GetCurrentUser } from 'src/common/decorators';
// Service
import { UserService } from './user.service';
// Dto
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
// Type
import { MessageSucces } from './types/message-succes.type';


@Controller('v1/user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { };


    @Put('/')
    @HttpCode(HttpStatus.OK)
    async updateDataUser(
        @Body() updateUser: UpdateUserDto,
        @GetCurrentUser('sub') userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<MessageSucces> {
        const userUpdated: UpdateUserDto = await this.userService
            .updateDataUser(userId, updateUser, refreshToken);

        return {
            message: '',
            code: 200,
            data: userUpdated
        };
    };


    @Put('/password')
    @HttpCode(HttpStatus.OK)
    async updatePasswordUser(
        @Body() userPassword: string,
        @GetCurrentUser('sub') userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<MessageSucces> {
        const userUpdated: UpdateUserDto = await this.userService
            .updatePasswordUser(userId, userPassword, refreshToken);

        return {
            message: 'Data successfully updated',
            code: 200,
            data: userUpdated
        };
    };


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(
        @Param('id') id: string,
        @GetCurrentUser('sub') userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<DeleteUserDto> {
        return await this.userService.deleteUser(Number(id), userId, refreshToken);
    };
};
