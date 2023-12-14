import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RtStrategy, AtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' }
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
