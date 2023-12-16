import { Module } from '@nestjs/common';
// modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MovieModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    }
  ],
})
export class AppModule { }
