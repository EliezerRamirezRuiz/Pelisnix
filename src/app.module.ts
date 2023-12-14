import { Module } from '@nestjs/common';
// modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { JwtController } from './jwt/jwt.controller';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from './jwt/jwt.module';
import { JwtstrategyModule } from './jwtstrategy/jwtstrategy.module';



@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    MovieModule, 
    UserModule, JwtModule, JwtstrategyModule
  ],
  controllers: [JwtController],
  providers: [JwtService],
})
export class AppModule {
  
}
