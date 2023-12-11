import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { User } from '@prisma/client';
import IUser from 'src/user/interfaces/user.interface';




@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signIn(data: { email: string; password: string; }): Promise<IUser> {
        const user = await this.userService.findUser(data)
        if (!user) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;

        return result
    }
}
