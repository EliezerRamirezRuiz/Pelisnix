import { Body, Controller, Param, Post } from '@nestjs/common';
import { Token } from './types/token.type';
import { AuthService } from './auth.service';

import CreateUserDto from './dto/create-user.dto';
import AuthUserDto from './dto/auth-user.dto';

@Controller('v1/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Post('/signup')
    async signUp(@Body() user: CreateUserDto): Promise<Token> {
        return await this.authService.signUp(user);
    };


    @Post('/signin')
    async signIn(@Body() user: AuthUserDto) {
        return await this.authService.signIn(user);
    };


    @Post('/logout/:id')
    async logout(@Param('id') id: string) {
        return await this.authService.logout(Number(id));
    };

    @Post('/refresh')
    async refreshToken() {
        return await this.authService.refreshToken();
    };
};
