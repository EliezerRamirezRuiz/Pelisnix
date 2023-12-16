import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Token } from './types/token.type';
// Services
import { AuthService } from './auth.service';
// Entities
import CreateUserDto from './dto/create-user.dto';
import AuthUserDto from './dto/auth-user.dto';
// Guards
import {
    AtGuard,
    RtGuard
} from 'src/common/guards';
// Decorators
import {
    GetCurrentUser,
    GetCurrentUserId,
    Public
} from '../common/decorators';


@Controller('v1/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    
    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() user: CreateUserDto): Promise<Token> {
        return await this.authService.signUp(user);
    };


    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() user: AuthUserDto): Promise<Token> {
        return await this.authService.signIn(user);
    };


    @Public()
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: number): Promise<void> {
        return await this.authService.logout(userId);
    };


    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @GetCurrentUser('sub') userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Token> {
        return await this.authService.refreshToken(userId, refreshToken);
    };
};