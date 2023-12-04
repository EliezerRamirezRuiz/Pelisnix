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
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';



@Module({
  imports: [AuthModule, PrismaModule, MovieModule],
  controllers: [AppController, AuthController, MovieController],
  providers: [AppService, AuthService, PrismaService, MovieService],
})
export class AppModule {
  
}
