import { Module } from '@nestjs/common';
// module
import { AuthModule } from './auth/auth.module';
// controller
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
// service
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';



@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {
  
}
