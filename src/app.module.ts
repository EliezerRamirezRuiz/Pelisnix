import { Module } from '@nestjs/common';
// modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    MovieModule, 
    UserModule
  ],
})
export class AppModule {
  
}
