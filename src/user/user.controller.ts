import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
// dto
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
// interface
import IUser from './interfaces/user.interface';

@Controller('v1/user')
export class UserController {
    constructor(private userService: UserService) { }


    @Post('')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
        return this.userService.createUser(createUserDto)
    }


    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<IUser> {
        return this.userService
            .updateUser(
                {
                    where: { id: Number(id) },
                    data: updateUserDto
                });
    }


    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<IUser> {
        return this.userService.deleteUser({ id: Number(id) })
    }
}
