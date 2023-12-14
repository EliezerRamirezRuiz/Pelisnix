import { Body, Controller, Post } from '@nestjs/common';
import { Token } from './types/token.type';
import { AuthService } from './auth.service';

import CreateUserDto from './dto/create-user.dto';

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
    async signIn() {
        return await this.authService.signIn();
    };


    @Post('/logout')
    async logout() {
        return await this.authService.logout();
    };

    @Post('/refresh')
    async refreshToken() {
        return await this.authService.refreshToken();
    };
};
