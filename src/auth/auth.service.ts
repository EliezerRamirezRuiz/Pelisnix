import {Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '@prisma/client';
import IUser from './interfaces/user.interface';

import { PrismaService } from 'src/prisma/prisma.service';

import * as bcript from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';
import { Token } from './types/token.type';


@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }

    async hashData(data: string): Promise<string> {
        return await bcript.hash(data, 10);
    };

    async signUp(user: CreateUserDto): Promise<Token> {
        const hash = await this.hashData(user.password);

        const newUser = this.prismaService.user.create({
            data: {
                fistName: user.fistName,
                latsName: user.latsName,
                email: user.email,
                password: hash,
            }
        });
        return
    }

    async signIn() { }

    async logout() { }

    async refreshToken() { }
}
