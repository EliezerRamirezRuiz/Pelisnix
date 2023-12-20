// Modules
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { GenderModule } from './gender/gender.module';
// Guard
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MovieModule,
    UserModule,
    CategoryModule,
    GenderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],

})
export class AppModule { }
