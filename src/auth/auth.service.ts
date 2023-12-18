import { ForbiddenException, Injectable } from '@nestjs/common';
// services
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
// dto
import CreateUserDto from './dto/create-user.dto';
import AuthUserDto from './dto/auth-user.dto';
// types
import { Token } from './types/token.type';
// hashing
import * as bcript from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }


    async signUp(user: CreateUserDto): Promise<Token> {
        const hash = await this.hashData(user.password);

        const newUser = this.prismaService.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                hashedPassword: hash,
            },
        });
        
        const tokens = await this.getTokens((await newUser).id, (await newUser).email);
        await this.updateRtHash((await newUser).id, tokens.refresh_token);
        return tokens;
    };


    async signIn(userDto: AuthUserDto): Promise<Token> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userDto.email,
            },
        });

        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

        const passwordMatches = await bcript.compare(userDto.password, user.hashedPassword);

        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    };


    async logout(userId: number): Promise<void> {
        await this.prismaService.user
            .updateMany({
                where: {
                    id: userId,
                    hashedRt: {
                        not: null
                    },
                },
                data: {
                    hashedRt: null
                }
            })
    };


    async refreshToken(userId: number, rt: string): Promise<Token> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new ForbiddenException('Access Denied');

        const rtMatches = await bcript.compare(rt, user.hashedRt);

        if (!rtMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    };


    async updateRtHash(userId: number, rt: string): Promise<void> {
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
                },
            ),
        ]);

        return {
            access_token: ar,
            refresh_token: rt,
        };
    };
};
