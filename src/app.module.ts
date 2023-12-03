import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AController } from './a/a.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthService } from './auth/auth.service';
import { ControllerController } from './auth/controller/controller.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AController, AuthController, ControllerController],
  providers: [AppService, AuthService],
})
export class AppModule {
  
}
