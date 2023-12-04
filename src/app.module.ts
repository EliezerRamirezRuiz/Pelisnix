import { Module } from '@nestjs/common';
// module
import { AuthModule } from './auth/auth.module';
// controller
import { AuthController } from './auth/auth.controller';
// service
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    MovieModule, 
    UserModule
  ],
  controllers: [
    AuthController, 
    MovieController, 
    UserController
  ],
  providers: [
    AuthService, 
    PrismaService, 
    MovieService, 
    UserService],
})
export class AppModule {
  
}
