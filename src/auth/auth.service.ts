import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import * as bcript from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';
import { Token } from './types/token.type';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }


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
        const tokens = await this.getTokens((await newUser).id, (await newUser).email);
        await this.updateRtHash((await newUser).id, tokens.refresh_token)
        return tokens;
    };

    
    async signIn() { }


    async logout() { }


    async refreshToken() { }

    
    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt);
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    };
    

    async hashData(data: string): Promise<string> {
        return await bcript.hash(data, 10);
    };


    async getTokens(userId: number, email: string): Promise<Token> {
        const [ar, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'at-secret',
                    expiresIn: 60 * 15
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'rt-secret',
                    expiresIn: 60 * 60 * 24 * 7
                }
            )
        ]);

        return {
            access_token: ar,
            refresh_token: rt
        };
    };
};
