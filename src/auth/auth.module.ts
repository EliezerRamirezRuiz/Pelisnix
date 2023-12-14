import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [],
  exports: [AuthService,],
  controllers: [AuthController]
})
export class AuthModule {

}
