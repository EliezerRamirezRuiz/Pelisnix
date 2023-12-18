import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { 
  RtStrategy, 
  AtStrategy 
} from './strategies';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '600s' }
    }),
  ],
  providers: [
    AuthService, 
    RtStrategy, 
    AtStrategy,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {};
